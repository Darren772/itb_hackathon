// ─── Domain Types ────────────────────────────────────────────────────────────

export type GroupCategory = "course" | "competition" | "event" | "social";
export type GroupStatus = "open" | "paused" | "full" | "closed";
export type RequestStatus = "pending" | "chatting" | "approved" | "rejected" | "withdrawn";
export type SwipeDirection = "left" | "right";
export type MemberRole = "leader" | "member";
export type NotificationType =
  | "new_request"
  | "chat_opened"
  | "message"
  | "approved"
  | "rejected";

export interface UserPublic {
  id: string;
  email: string;
  full_name: string;
  major: string | null;
  academic_year: number | null;
  bio: string | null;
  linkedin_url: string | null;
  skills: string[];
  courses: { course_code: string; course_name?: string; status: string }[];
  created_at: string;
}

export interface GroupCard {
  id: string;
  title: string;
  description: string | null;
  category: GroupCategory;
  course_code: string | null;
  target_size: number;
  current_size: number;
  target_grade: string | null;
  weekly_commitment_hours: number | null;
  skills_needed: string[];
  leader: { id: string; full_name: string; major: string | null };
  ai_reason: string | null; // "Why this group" (AI-02)
  ai_score: number | null;
  created_at: string;
}

export interface JoinRequest {
  id: string;
  seeker_id: string;
  group_id: string;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
}

export interface FitSummary {
  match_points: string[];
  gaps: string[];
  suggested_questions: string[];
  summary: string;
}

export interface Message {
  id: string;
  request_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  payload: Record<string, unknown> | null;
  is_read: boolean;
  created_at: string;
}
