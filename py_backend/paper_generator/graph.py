"""
graph.py — LangGraph graph definition.
"""
from langgraph.graph import StateGraph, END
from paper_generator.state import PaperGeneratorState
from paper_generator.agents.orchestrator import orchestrate
from paper_generator.agents.fetcher     import fetch
from paper_generator.agents.verifier    import verify
from paper_generator.agents.layout      import layout


def should_keep_fetching(state: PaperGeneratorState) -> str:
    if state.get("fetch_queue"):
        return "fetch"
    return "verify"


def should_refetch_or_layout(state: PaperGeneratorState) -> str:
    refetch_queue = state.get("refetch_queue", [])
    if not refetch_queue:
        return "layout"

    # Allow attempts up to max_refetch_attempts (inclusive)
    # If a task in the queue is attempt 2 and max is 2, we should RUN it.
    all_maxed = all(t.get("attempt", 1) > state.get("max_refetch_attempts", 2) for t in refetch_queue)
    if all_maxed:
        print("[GRAPH] Max refetch attempts reached \u2014 proceeding to layout with available questions.")
        return "layout"

    return "fetch_refetch"


def build_graph():
    g = StateGraph(PaperGeneratorState)

    g.add_node("orchestrate",    orchestrate)
    g.add_node("fetch",          fetch)
    g.add_node("verify",         verify)
    g.add_node("fetch_refetch",  fetch)
    g.add_node("layout",         layout)

    g.set_entry_point("orchestrate")

    g.add_edge("orchestrate", "fetch")

    g.add_conditional_edges(
        "fetch",
        should_keep_fetching,
        {"fetch": "fetch", "verify": "verify"},
    )

    g.add_conditional_edges(
        "verify",
        should_refetch_or_layout,
        {"fetch_refetch": "fetch_refetch", "layout": "layout"},
    )

    g.add_conditional_edges(
        "fetch_refetch",
        lambda s: "fetch_refetch" if s.get("refetch_queue") else "layout",
        {"fetch_refetch": "fetch_refetch", "layout": "layout"},
    )

    g.add_edge("layout", END)

    return g.compile()
