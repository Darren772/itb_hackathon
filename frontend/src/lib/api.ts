const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function request<T>(
  path: string,
  options: RequestInit & { token?: string } = {},
): Promise<T> {
  const { token, ...rest } = options;
  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...rest.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? res.statusText);
  }
  return res.json() as Promise<T>;
}

export const api = {
  // Profile
  getMe: (token: string) => request("/me", { token }),
  updateMe: (token: string, body: object) =>
    request("/me", { method: "PUT", body: JSON.stringify(body), token }),

  // Feed & Groups
  getFeed: (token: string, params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request(`/feed${qs}`, { token });
  },
  createGroup: (token: string, body: object) =>
    request("/groups", { method: "POST", body: JSON.stringify(body), token }),
  getGroup: (token: string, id: string) =>
    request(`/groups/${id}`, { token }),
  updateGroup: (token: string, id: string, body: object) =>
    request(`/groups/${id}`, { method: "PATCH", body: JSON.stringify(body), token }),

  // Swipes
  swipe: (token: string, groupId: string, direction: "left" | "right") =>
    request("/swipes", {
      method: "POST",
      body: JSON.stringify({ group_id: groupId, direction }),
      token,
    }),

  // Requests
  listRequests: (token: string) => request("/requests", { token }),
  openChat: (token: string, id: string) =>
    request(`/requests/${id}/open-chat`, { method: "POST", token }),
  approve: (token: string, id: string) =>
    request(`/requests/${id}/approve`, { method: "POST", token }),
  reject: (token: string, id: string) =>
    request(`/requests/${id}/reject`, { method: "POST", token }),
  withdraw: (token: string, id: string) =>
    request(`/requests/${id}/withdraw`, { method: "POST", token }),
  getFitSummary: (token: string, id: string) =>
    request(`/requests/${id}/fit-summary`, { token }),

  // Agent
  agentAsk: (token: string, query: string) =>
    request("/agent/ask", { method: "POST", body: JSON.stringify({ query }), token }),

  // Notifications
  getNotifications: (token: string) => request("/notifications", { token }),
};
