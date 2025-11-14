import { prisma } from "../../config/db.js";

export async function listProfiles() {
  return prisma.profile.findMany({
    select: { id: true, name: true, bio: true, location: true, createdAt: true },
    orderBy: { id: "asc" },
  });
}

export async function createProfile(data: { name: string; bio: string; location: string; userId: number }) {
  return prisma.profile.create({
    data: {
      name: data.name,
      bio: data.bio,
      location: data.location,
      user: { connect: { id: data.userId } },
    },
    select: { id: true, name: true, bio: true, location: true, createdAt: true },
  });
}


export async function getProfileById(id: number) {
  return prisma.profile.findUnique({
    where: { id },
    select: { id: true, name: true, bio: true, location: true, createdAt: true },
  });
}

export async function deleteProfile(id: number) {
  return prisma.profile.delete({ where: { id } });
}
