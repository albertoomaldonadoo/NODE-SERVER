import { prisma } from "../../config/db.js";

export async function listProfiles() {
  return prisma.profile.findMany({
    select: { id: true, name: true, bio: true, location: true, createdAt: true },
    orderBy: { id: "asc" },
  });
}

export async function createProfile(data: { name: string; bio: string; location?: string | undefined}) {
  return prisma.profile.create({
    data,
    select: { id: true, name: true, bio: true, location: true, createdAt: true },
  });
}

export async function deleteProfile(id: number) {
  return prisma.profiles.delete({ where: { id } });
}
