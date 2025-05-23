import { z } from "zod"
import { rabbitHttpRequest } from "../client.js"
import { MCPTextContent, MCPToolResult } from "../types/mcp.js"

export const listUsers = {
  name: "list-users",
  description: "List all users in the RabbitMQ cluster.",
  params: z.object({}),
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  },
  annotations: {
    title: "List Users",
    readOnlyHint: true,
    openWorldHint: true
  },
  handler: async (_args: {}): Promise<MCPToolResult> => {
    const users = await rabbitHttpRequest("/users")
    return { content: [{ type: "text", text: JSON.stringify(users, null, 2) } as MCPTextContent] }
  }
}

export const getUser = {
  name: "get-user",
  description: "Get details for a specific user.",
  params: z.object({ name: z.string() }),
  inputSchema: {
    type: "object",
    properties: { name: { type: "string" } },
    required: ["name"]
  },
  annotations: {
    title: "Get User Details",
    readOnlyHint: true,
    openWorldHint: true
  },
  handler: async (args: any): Promise<MCPToolResult> => {
    const { name } = getUser.params.parse(args)
    const user = await rabbitHttpRequest(`/users/${encodeURIComponent(name)}`)
    return { content: [{ type: "text", text: JSON.stringify(user, null, 2) } as MCPTextContent] }
  }
}

export const putUser = {
  name: "put-user",
  description: "Create or update a user.",
  params: z.object({ name: z.string(), password: z.string().optional(), tags: z.string().optional() }),
  inputSchema: {
    type: "object",
    properties: {
      name: { type: "string" },
      password: { type: "string" },
      tags: { type: "string" }
    },
    required: ["name"]
  },
  annotations: {
    title: "Create or Update User",
    readOnlyHint: false,
    openWorldHint: true
  },
  handler: async (args: any): Promise<MCPToolResult> => {
    const { name, ...body } = putUser.params.parse(args)
    const result = await rabbitHttpRequest(
      `/users/${encodeURIComponent(name)}`,
      "PUT",
      undefined,
      body
    )
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) } as MCPTextContent] }
  }
}

export const deleteUser = {
  name: "delete-user",
  description: "Delete a user.",
  params: z.object({ name: z.string() }),
  inputSchema: {
    type: "object",
    properties: { name: { type: "string" } },
    required: ["name"]
  },
  annotations: {
    title: "Delete User",
    readOnlyHint: false,
    openWorldHint: true
  },
  handler: async (args: any): Promise<MCPToolResult> => {
    const { name } = deleteUser.params.parse(args)
    const result = await rabbitHttpRequest(
      `/users/${encodeURIComponent(name)}`,
      "DELETE"
    )
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) } as MCPTextContent] }
  }
}

export const listUserPermissions = {
  name: "list-user-permissions",
  description: "List all permissions for a user.",
  params: z.object({ user: z.string() }),
  inputSchema: {
    type: "object",
    properties: { user: { type: "string" } },
    required: ["user"]
  },
  annotations: {
    title: "List User Permissions",
    readOnlyHint: true,
    openWorldHint: true
  },
  handler: async (args: any): Promise<MCPToolResult> => {
    const { user } = listUserPermissions.params.parse(args)
    const permissions = await rabbitHttpRequest(`/users/${encodeURIComponent(user)}/permissions`)
    return { content: [{ type: "text", text: JSON.stringify(permissions, null, 2) } as MCPTextContent] }
  }
}

export const listUserTopicPermissions = {
  name: "list-user-topic-permissions",
  description: "List all topic permissions for a user.",
  params: z.object({ user: z.string() }),
  inputSchema: {
    type: "object",
    properties: { user: { type: "string" } },
    required: ["user"]
  },
  annotations: {
    title: "List User Topic Permissions",
    readOnlyHint: true,
    openWorldHint: true
  },
  handler: async (args: any): Promise<MCPToolResult> => {
    const { user } = listUserTopicPermissions.params.parse(args)
    const topicPermissions = await rabbitHttpRequest(`/users/${encodeURIComponent(user)}/topic-permissions`)
    return { content: [{ type: "text", text: JSON.stringify(topicPermissions, null, 2) } as MCPTextContent] }
  }
}

export const listUsersWithoutPermissions = {
  name: "list-users-without-permissions",
  description: "List all users without permissions.",
  params: z.object({}),
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  },
  annotations: {
    title: "List Users Without Permissions",
    readOnlyHint: true,
    openWorldHint: true
  },
  handler: async (_args: {}): Promise<MCPToolResult> => {
    const users = await rabbitHttpRequest("/users/without-permissions")
    return { content: [{ type: "text", text: JSON.stringify(users, null, 2) } as MCPTextContent] }
  }
}

export const bulkDeleteUsers = {
  name: "bulk-delete-users",
  description: "Bulk delete users.",
  params: z.object({ users: z.array(z.string()) }),
  inputSchema: {
    type: "object",
    properties: { users: { type: "array", items: { type: "string" } } },
    required: ["users"]
  },
  annotations: {
    title: "Bulk Delete Users",
    readOnlyHint: false,
    openWorldHint: true
  },
  handler: async (args: any): Promise<MCPToolResult> => {
    const { users } = bulkDeleteUsers.params.parse(args)
    const result = await rabbitHttpRequest(
      `/users/bulk-delete`,
      "POST",
      undefined,
      { users }
    )
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) } as MCPTextContent] }
  }
}

export const listUserLimits = {
  name: "list-user-limits",
  description: "List all user limits.",
  params: z.object({}),
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  },
  annotations: {
    title: "List User Limits",
    readOnlyHint: true,
    openWorldHint: true
  },
  handler: async (_args: {}): Promise<MCPToolResult> => {
    const limits = await rabbitHttpRequest("/user-limits")
    return { content: [{ type: "text", text: JSON.stringify(limits, null, 2) } as MCPTextContent] }
  }
}

export const getUserLimit = {
  name: "get-user-limit",
  description: "Get a user limit.",
  params: z.object({ user: z.string() }),
  inputSchema: {
    type: "object",
    properties: { user: { type: "string" } },
    required: ["user"]
  },
  annotations: {
    title: "Get User Limit",
    readOnlyHint: true,
    openWorldHint: true
  },
  handler: async (args: any): Promise<MCPToolResult> => {
    const { user } = getUserLimit.params.parse(args)
    const limit = await rabbitHttpRequest(`/user-limits/${encodeURIComponent(user)}`)
    return { content: [{ type: "text", text: JSON.stringify(limit, null, 2) } as MCPTextContent] }
  }
}

export const setUserLimit = {
  name: "set-user-limit",
  description: "Set a user limit.",
  params: z.object({ user: z.string(), name: z.string(), value: z.number() }),
  inputSchema: {
    type: "object",
    properties: {
      user: { type: "string" },
      name: { type: "string" },
      value: { type: "number" }
    },
    required: ["user", "name", "value"]
  },
  annotations: {
    title: "Set User Limit",
    readOnlyHint: false,
    openWorldHint: true
  },
  handler: async (args: any): Promise<MCPToolResult> => {
    const { user, name, value } = setUserLimit.params.parse(args)
    const result = await rabbitHttpRequest(
      `/user-limits/${encodeURIComponent(user)}/${encodeURIComponent(name)}`,
      "PUT",
      undefined,
      { value }
    )
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) } as MCPTextContent] }
  }
}

export const deleteUserLimit = {
  name: "delete-user-limit",
  description: "Delete a user limit.",
  params: z.object({ user: z.string(), name: z.string() }),
  inputSchema: {
    type: "object",
    properties: {
      user: { type: "string" },
      name: { type: "string" }
    },
    required: ["user", "name"]
  },
  annotations: {
    title: "Delete User Limit",
    readOnlyHint: false,
    openWorldHint: true
  },
  handler: async (args: any): Promise<MCPToolResult> => {
    const { user, name } = deleteUserLimit.params.parse(args)
    const result = await rabbitHttpRequest(
      `/user-limits/${encodeURIComponent(user)}/${encodeURIComponent(name)}`,
      "DELETE"
    )
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) } as MCPTextContent] }
  }
}

export const USER_TOOLS = [
  listUsers,
  getUser,
  putUser,
  deleteUser,
  listUserPermissions,
  listUserTopicPermissions,
  listUsersWithoutPermissions,
  bulkDeleteUsers,
  listUserLimits,
  getUserLimit,
  setUserLimit,
  deleteUserLimit
]
