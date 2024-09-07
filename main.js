import { auth, db, googleProvider, facebookProvider } from './firebase-config.js';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Función para mostrar mensajes
function showMessage(message, type = 'info') {
  const messageContainer = document.getElementById('messageContainer');
  messageContainer.textContent = message;
  messageContainer.className = `alert alert-${type} fade-in`;
  messageContainer.style.display = 'block';

  setTimeout(() => {
    messageContainer.style.display = 'none';
  }, 3000);
}

// Inicio de sesión con Google
document.getElementById('googleLogin').addEventListener('click', () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      showMessage(`¡Bienvenido, ${result.user.displayName}!`, 'success');
      $('#authModal').modal('hide');
    })
    .catch((error) => {
      console.error("Error al iniciar sesión con Google: ", error);
      showMessage("Error al iniciar sesión con Google.", 'danger');
    });
});

// Inicio de sesión con Facebook
document.getElementById('facebookLogin').addEventListener('click', () => {
  signInWithPopup(auth, facebookProvider)
    .then((result) => {
      showMessage(`¡Bienvenido, ${result.user.displayName}!`, 'success');
      $('#authModal').modal('hide');
    })
    .catch((error) => {
      console.error("Error al iniciar sesión con Facebook: ", error);
      showMessage("Error al iniciar sesión con Facebook.", 'danger');
    });
});

// Mostrar formulario de inicio de sesión con email
document.getElementById('showEmailLogin').addEventListener('click', () => {
  $('#authModal').modal('hide');
  $('#secondaryModal').modal('show');
  $('#secondaryModalLabel').text('Iniciar Sesión con Email');
  $('#emailForm').show();
  $('#registerForm').hide();
});

// Mostrar formulario de registro
document.getElementById('showRegister').addEventListener('click', () => {
  $('#authModal').modal('hide');
  $('#secondaryModal').modal('show');
  $('#secondaryModalLabel').text('Registrarse');
  $('#registerForm').show();
  $('#emailForm').hide();
});

// Inicio de sesión con Email
document.getElementById('emailLogin').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage(`¡Bienvenido, ${userCredential.user.email}!`, 'success');
      $('#secondaryModal').modal('hide');
    })
    .catch((error) => {
      console.error("Error al iniciar sesión con Email: ", error);
      if (error.code === 'auth/user-not-found') {
        showMessage("Usuario no encontrado.", 'danger');
      } else if (error.code === 'auth/wrong-password') {
        showMessage("Contraseña incorrecta.", 'danger');
      } else {
        showMessage("Error al iniciar sesión con Email.", 'danger');
      }
    });
});

// Registro de usuario con Email
document.getElementById('registerUser').addEventListener('click', () => {
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage(`¡Registro exitoso, ${userCredential.user.email}!`, 'success');
      $('#secondaryModal').modal('hide');
    })
    .catch((error) => {
      console.error("Error al registrarse: ", error);
      if (error.code === 'auth/email-already-in-use') {
        showMessage("El email ya está registrado.", 'danger');
      } else if (error.code === 'auth/weak-password') {
        showMessage("La contraseña es muy débil.", 'danger');
      } else {
        showMessage("Error al registrarse.", 'danger');
      }
    });
});

// Cerrar sesión
document.getElementById('logout').addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      showMessage('Sesión cerrada exitosamente.', 'success');
    })
    .catch((error) => {
      console.error('Error al cerrar sesión:', error);
      showMessage('Error al cerrar sesión.', 'danger');
    });
});

// Enviar pedido de oración
document.getElementById('prayerRequestForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const requesterName = document.getElementById('requesterName').value;
  const requesterEmail = document.getElementById('requesterEmail').value;
  const prayerRequest = document.getElementById('prayerRequest').value;

  try {
    await addDoc(collection(db, 'prayerRequests'), {
      name: requesterName,
      email: requesterEmail,
      request: prayerRequest,
      timestamp: new Date()
    });
    showMessage('Pedido de oración enviado con éxito.', 'success');
    $('#prayerRequestModal').modal('hide');
    document.getElementById('prayerRequestForm').reset();
  } catch (error) {
    console.error('Error al enviar el pedido de oración: ', error);
    showMessage('Error al enviar el pedido de oración.', 'danger');
  }
});


