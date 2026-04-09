"use client";

import { cn } from "@/lib/utils";
import {
  FontFamily,
  FontStyle,
  FontWeight,
  FormattingOptions,
} from "../../types/create/types";

interface FormattingStepProps {
  formatting: FormattingOptions;
  onChange: (updated: FormattingOptions) => void;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
}

const FONT_FAMILIES: { label: string; value: FontFamily; style: React.CSSProperties }[] = [
  { label: "Times New Roman", value: "Times New Roman", style: { fontFamily: "Times New Roman, serif" } },
  { label: "Arial", value: "Arial", style: { fontFamily: "Arial, sans-serif" } },
  { label: "Serif", value: "serif", style: { fontFamily: "serif" } },
  { label: "Sans-serif", value: "sans-serif", style: { fontFamily: "sans-serif" } },
  { label: "Monospace", value: "monospace", style: { fontFamily: "monospace" } },
];

const SIZE_OPTIONS = [10, 11, 12, 13, 14, 16, 18, 20];

function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T; style?: React.CSSProperties }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "px-2.5 py-1 rounded-md border text-xs font-medium transition-all cursor-pointer",
            value === opt.value
              ? "border-black dark:border-white bg-black/5 dark:bg-white/10"
              : "border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
          )}
          style={opt.style}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function SizeSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="px-2 py-1 rounded-md border border-black/10 dark:border-white/10 bg-neutral-100/80 dark:bg-neutral-800 text-xs cursor-pointer appearance-none"
    >
      {SIZE_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {s}px
        </option>
      ))}
    </select>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-3 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-800/50 space-y-2.5">
      <div>
        <p className="text-xs font-semibold text-foreground">{title}</p>
        {subtitle && <p className="text-[10px] text-foreground/50">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-foreground/60 w-16 shrink-0">{label}</span>
      {children}
    </div>
  );
}

export function FormattingStep({
  formatting,
  onChange,
  onBack,
  onNext,
  nextLabel = "Next",
}: FormattingStepProps) {
  const set = <K extends keyof FormattingOptions>(key: K, val: FormattingOptions[K]) =>
    onChange({ ...formatting, [key]: val });

  return (
    <div className="h-full bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-lg shadow-black/5 dark:shadow-black/20 animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col">
      <div className="space-y-1 mb-3">
        <h2 className="text-base font-semibold text-foreground">Formatting</h2>
        <p className="text-xs text-foreground/50">Customise fonts for the generated paper</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2 pr-0.5">
        <Section title="Header" subtitle="School name, exam name, class line">
          <Row label="Font">
            <ToggleGroup<FontFamily>
              options={FONT_FAMILIES}
              value={formatting.headerFontFamily}
              onChange={(v) => set("headerFontFamily", v)}
            />
          </Row>
          <Row label="Size">
            <SizeSelect
              value={formatting.headerFontSize}
              onChange={(v) => set("headerFontSize", v)}
            />
          </Row>
          <Row label="Weight">
            <ToggleGroup<FontWeight>
              options={[
                { label: "Normal", value: "normal" },
                { label: "Bold", value: "bold" },
              ]}
              value={formatting.headerFontWeight}
              onChange={(v) => set("headerFontWeight", v)}
            />
          </Row>
          <Row label="Style">
            <ToggleGroup<FontStyle>
              options={[
                { label: "Normal", value: "normal" },
                { label: "Italic", value: "italic" },
              ]}
              value={formatting.headerFontStyle}
              onChange={(v) => set("headerFontStyle", v)}
            />
          </Row>
        </Section>

        <Section title="Headings / Questions" subtitle="Section headings and question text">
          <Row label="Font">
            <ToggleGroup<FontFamily>
              options={FONT_FAMILIES}
              value={formatting.headingFontFamily}
              onChange={(v) => set("headingFontFamily", v)}
            />
          </Row>
          <Row label="Size">
            <SizeSelect
              value={formatting.headingFontSize}
              onChange={(v) => set("headingFontSize", v)}
            />
          </Row>
          <Row label="Weight">
            <ToggleGroup<FontWeight>
              options={[
                { label: "Normal", value: "normal" },
                { label: "Bold", value: "bold" },
              ]}
              value={formatting.headingFontWeight}
              onChange={(v) => set("headingFontWeight", v)}
            />
          </Row>
          <Row label="Style">
            <ToggleGroup<FontStyle>
              options={[
                { label: "Normal", value: "normal" },
                { label: "Italic", value: "italic" },
              ]}
              value={formatting.headingFontStyle}
              onChange={(v) => set("headingFontStyle", v)}
            />
          </Row>
        </Section>

        <Section title="Body Text" subtitle="Marks lines, instructions, chapter list">
          <Row label="Font">
            <ToggleGroup<FontFamily>
              options={FONT_FAMILIES}
              value={formatting.bodyFontFamily}
              onChange={(v) => set("bodyFontFamily", v)}
            />
          </Row>
          <Row label="Size">
            <SizeSelect
              value={formatting.bodyFontSize}
              onChange={(v) => set("bodyFontSize", v)}
            />
          </Row>
        </Section>
      </div>

      <div className="flex justify-between pt-2 mt-3">
        <button
          onClick={onBack}
          className="btn-glass btn-glass-icon !rounded-xl !py-2 !px-4 text-sm font-medium"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className={cn(
            "btn-glass btn-glass-primary !px-4 !py-2 text-sm",
            nextLabel === "Generate" && "font-bold"
          )}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
