import { and, db, eq } from "@repo/db";
import { sourceDocument } from "@repo/db/schema";
import { nanoid } from "@repo/utils";

export class DocumentStore {
  /**
   * Checks if a document (URL) has already been processed.
   */
  async isAlreadyProcessed(url: string): Promise<boolean> {
    const existing = await db.query.sourceDocument.findFirst({
      where: and(eq(sourceDocument.url, url), eq(sourceDocument.status, "parsed")),
    });
    return !!existing;
  }

  /**
   * Tracks a document in the database.
   */
  async trackDocument(data: {
    source: string;
    url: string;
    status: string;
    candidateId?: string;
    metadata?: string;
  }) {
    // Check if it exists first to update, or just insert
    const existing = await db.query.sourceDocument.findFirst({
      where: eq(sourceDocument.url, data.url),
    });

    if (existing) {
      await db
        .update(sourceDocument)
        .set({
          status: data.status,
          candidateId: data.candidateId,
          metadata: data.metadata,
          updatedAt: new Date(),
        })
        .where(eq(sourceDocument.id, existing.id));
    } else {
      await db.insert(sourceDocument).values({
        id: `doc_${nanoid()}`,
        source: data.source,
        url: data.url,
        status: data.status,
        candidateId: data.candidateId,
        metadata: data.metadata,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }
}
