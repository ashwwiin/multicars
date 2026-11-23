import fs from "fs";
import path from "path";

export type CustomerReview = {
  id: string;
  name: string;
  service?: string;
  rating: number; // 1 to 5
  text: string;
  date: string;
  source: "google" | "direct";
};

const REVIEWS_FILE = path.join(process.cwd(), "src", "data", "reviews.json");

export function getReviews(): CustomerReview[] {
  try {
    if (!fs.existsSync(REVIEWS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(REVIEWS_FILE, "utf-8");
    return JSON.parse(data) as CustomerReview[];
  } catch (error) {
    console.error("Error reading reviews.json:", error);
    return [];
  }
}

export function saveReview(newReview: Omit<CustomerReview, "id" | "date" | "source">): CustomerReview {
  const currentReviews = getReviews();
  const created: CustomerReview = {
    ...newReview,
    id: `rev-${Date.now()}`,
    date: "Just now",
    source: "direct",
  };

  const updated = [created, ...currentReviews];
  try {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing reviews.json:", error);
  }

  return created;
}
