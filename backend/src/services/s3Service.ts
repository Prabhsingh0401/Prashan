import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import dotenv from "dotenv";
import { Readable } from "stream";

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

/**
 * Upload a stream or buffer to S3
 */
export async function uploadToS3(
  key: string,
  body: Buffer | Readable | string,
  contentType: string
): Promise<string> {
  try {
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: body,
        ContentType: contentType,
        ACL: 'public-read',
      },
    });

    await upload.done();
    return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/${key}`;
  } catch (error) {
    console.error("S3 upload error:", error);
    throw error;
  }
}
