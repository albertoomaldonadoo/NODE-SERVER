import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { auth } from "../../middleware/auth.js";
import { createProfileSchema } from "./profiles.schema.js";
import { listProfilesCtrl, createProfileCtrl, deleteProfileCtrl, getProfileCtrl } from "./profiles.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: Operaciones básicas con perfiles
 */

/**
 * @swagger
 * /api/profiles:
 *   get:
 *     summary: Lista todos los perfiles
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de perfiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 */
router.get("/", auth, listProfilesCtrl);

/**
 * @swagger
 * /api/profiles/{id}:
 *   get:
 *     summary: Obtiene un perfil por ID
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del perfil a consultar
 *     responses:
 *       200:
 *         description: Perfil encontrado
 *       404:
 *         description: Perfil no encontrado
 */
router.get("/:id", auth, getProfileCtrl);

/**
 * @swagger
 * /api/profiles:
 *   post:
 *     summary: Crea un nuevo perfil
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProfileInput'
 *     responses:
 *       201:
 *         description: Perfil creado correctamente
 */
router.post("/", auth, validate(createProfileSchema), createProfileCtrl);

/**
 * @swagger
 * /api/profiles/{id}:
 *   delete:
 *     summary: Elimina un perfil por ID
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del perfil a eliminar
 *     responses:
 *       204:
 *         description: Perfil eliminado correctamente
 *       404:
 *         description: Perfil no encontrado
 */
router.delete("/:id", auth, deleteProfileCtrl);

export default router;
