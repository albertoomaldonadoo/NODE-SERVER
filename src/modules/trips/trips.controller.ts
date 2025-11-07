import type { Request, Response } from 'express';
import { createTrip, findTripById, listTrips, updateTrip, deleteTrip } from './trips.service.js';

export async function listTripsCtrl(req: Request, res: Response) {
  try {
    const id = req.query.userId ? Number(req.query.userId) : undefined;
    const trips = await listTrips(id);
    res.json(trips);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getTripCtrl(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

    const trip = await findTripById(id);
    if (!trip) return res.status(404).json({ message: 'Itinerario no encontrado' });

    res.json(trip);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function createTripCtrl(req: Request, res: Response) {
  try {
    const trip = await createTrip(req.body);
    res.status(201).json(trip);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateTripCtrl(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

    const trip = await updateTrip(id, req.body);
    res.json(trip);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Itinerario no encontrado' });
    res.status(500).json({ message: error.message });
  }
}

export async function deleteTripCtrl(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

    await deleteTrip(id);
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Itinerario no encontrado' });
    res.status(500).json({ message: error.message });
  }
}
