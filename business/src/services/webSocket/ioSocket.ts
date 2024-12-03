import { io } from 'socket.io-client';
import { BASE_URL } from '../../../../constants.ts';

export const socket = io(BASE_URL);

/*
 * Författare: Kim
 * startar upp socket.io clienten
 *
 * Ändrat: Magnus
 * Använder nu variabel för url.
 */
