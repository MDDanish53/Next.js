import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    imageUrl: v.optional(v.string()),
    plan: v.union(v.literal("free"), v.literal("pro")),
    // Usage tracking for plan limits
    projectsUsed: v.number(), // Current project count
    exportsThisMonth: v.number(), // Monthly export limit tracking
    createdAt: v.number(),
    lastActiveAt: v.number(),
  }).index("by_token", ["tokenIdentifier"]),

  projects: defineTable({
    // Basic project info
    title: v.string(),
    userId: v.id("users"),

    // Canvas dimensions and state
    canvasState: v.any(), // Fabric.js canvas JSON (objects, layers, etc),
    width: v.number(), // Canvas width in pixels
    height: v.number(), // Canvas height in pixels

    // Image pipeline - tracks image transformations
    originalImageUrl: v.optional(v.string()), // Initial uploaded image
    currentImageUrl: v.optional(v.string()), // Current processed image
    thumbnailUrl: v.optional(v.string()), // HW - small preview for dashboard

    // ImageKit Transformation state
    activeTransformations: v.optional(v.string()), // current ImageKit Url params

    // AI features state - tracks what AI processing has been applied
    backgroundRemoved: v.optional(v.boolean()), // Has background been removed

    // Organization
    folderId: v.optional(v.id("folders")), // optional folder organization

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(), // Last edit time
  })
    .index("by_user", ["userId"])
    .index("by_user_updated", ["userId", "updatedAt"])
    .index("by_folder", ["folderId"]), // Projects in folder

  folders: defineTable({
    name: v.string(), // Folder name
    userId: v.id("users"), // Owner
    createdAt: v.number(),
  }).index("by_user", ["userId"]) // user's folder
});

/*
PLAN LIMITS EXAMPLE:
- Free : 3 projects, 20 exports/month, basic features only
- Pro : Unlimited projects/exports, all AI features
 */