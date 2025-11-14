import type { Request, Response } from "express";
import { listProfiles, createProfile, deleteProfile, getProfileById } from "./profiles.services.js";
import { createProfileSchema } from "./profiles.schema.js";

export async function listProfilesCtrl(_req: Request, res: Response) {
  try {
    const profiles = await listProfiles();
    res.json(profiles);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getProfileCtrl(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    const profile = await getProfileById(id);
    if (!profile) return res.status(404).json({ message: "Perfil no encontrado" });

    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function createProfileCtrl(req: Request, res: Response) {
  try {
    const data = createProfileSchema.parse(req.body);
    const profile = await createProfile({
      name: data.name,
      bio: data.bio,
      location: data.location,
      userId: req.user.sub
    });
    res.status(201).json(profile);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}


export async function deleteProfileCtrl(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }
    await deleteProfile(id);
    res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }
    res.status(500).json({ message: error.message });
  }
}
