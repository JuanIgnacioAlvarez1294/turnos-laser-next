import { db } from '../lib/firebase/client';
import { User } from '../types';

const usuariosService = {
  async crearUsuario(data: User) {
    const userRef = db.collection('users').doc(data.userId);
    await userRef.set(data);
    return userRef.id;
  },

  async obtenerUsuario(userId: string) {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    return userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;
  },

  async actualizarUsuario(userId: string, data: Partial<User>) {
    const userRef = db.collection('users').doc(userId);
    await userRef.update(data);
  },

  async eliminarUsuario(userId: string) {
    const userRef = db.collection('users').doc(userId);
    await userRef.delete();
  },

  async obtenerUsuarios() {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};

export default usuariosService;