import { prisma } from '../../config/db.js';

export async function createTrip(data: { title: string, description?: string, startDate?: string, endDate?: string, userId: number }) {
  return prisma.trip.create({
    data,
  });
}

export async function findTripById(id: number) {
  return prisma.trip.findUnique({ where: { id } });
}

export async function listTrips(id?: number) {
  return prisma.trip.findMany({
    where: id ? { id } : {},
    orderBy: { id: 'asc' }
  });
}

export async function updateTrip(id: number, data: { title?: string, description?: string, startDate?: string, endDate?: string }) {
  return prisma.trip.update({
    where: { id },
    data
  });
}

export async function deleteTrip(id: number) {
  return prisma.trip.delete({ where: { id } });
}
