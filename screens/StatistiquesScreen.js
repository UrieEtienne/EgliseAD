const membresEglise = membres.filter(
 m => m.egliseId === egliseId
);

const total = membresEglise.length;

const chorale = membresEglise.filter(
 m => m.departement === "Chorale"
).length;