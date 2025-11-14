import React from 'react';
import { LegalDocument } from '../types';

export const legalDocuments: LegalDocument[] = [
  {
    id: 'terms',
    title: 'Términos y Condiciones',
    description: 'Las reglas y directrices para usar nuestros servicios.',
    content: (
      <>
        <h2>1. Aceptación de los Términos</h2>
        <p>Al acceder o utilizar la aplicación Cuidamet ("el Servicio"), usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de los términos, no podrá acceder al Servicio.</p>

        <h2>2. Descripción del Servicio</h2>
        <p>Cuidamet es una plataforma tecnológica que permite a los usuarios ("Usuarios") encontrar y conectar con proveedores de servicios de cuidado independientes ("Cuidadores") para personas mayores, niños y mascotas.</p>
        
        <h2>3. Rol y Responsabilidad de Cuidamet</h2>
        <p><strong>Cuidamet actúa únicamente como un intermediario tecnológico y un punto de encuentro.</strong> Nuestra plataforma facilita el contacto entre Usuarios y Cuidadores. No empleamos a los Cuidadores, y estos actúan como contratistas independientes.</p>
        <p>Usted entiende y acepta que Cuidamet:</p>
        <ul>
          <li>No es responsable de la conducta, acciones u omisiones de ningún Usuario o Cuidador, ya sea en línea o fuera de línea.</li>
          <li>No garantiza la calidad, seguridad o legalidad de los servicios proporcionados por los Cuidadores.</li>
          <li>Realiza verificaciones básicas de identidad, pero <strong>la responsabilidad final de seleccionar un Cuidador adecuado y de verificar sus credenciales, experiencia y referencias recae exclusivamente en el Usuario.</strong></li>
        </ul>
        <p>Cualquier acuerdo, contrato o arreglo para la prestación de servicios de cuidado se realiza directamente entre el Usuario y el Cuidador. Cuidamet no es parte de dicho acuerdo y se exime de toda responsabilidad derivada del mismo.</p>

        <h2>4. Obligaciones del Usuario</h2>
        <p>Usted se compromete a proporcionar información precisa y completa, a tratar a los Cuidadores con respeto y a cumplir con todas las leyes aplicables al contratar servicios de cuidado.</p>
        
        <h2>5. Suscripción Cuidamet Premium para Cuidadores</h2>
        <p>Cuidamet ofrece un servicio de suscripción opcional para Cuidadores, denominado "Cuidamet Premium", diseñado para aumentar su visibilidad en la plataforma.</p>
        <p><strong>Beneficios:</strong> Los suscriptores de Cuidamet Premium disfrutarán de:</p>
        <ul>
          <li><strong>Posicionamiento Preferencial:</strong> Sus perfiles aparecerán en las primeras posiciones de los resultados de búsqueda, por encima de los perfiles no premium.</li>
          <li><strong>Insignia Premium:</strong> Una insignia distintiva se mostrará en su perfil y tarjeta de cuidador, indicando su estatus Premium.</li>
          <li><strong>Marcador Destacado en el Mapa:</strong> Su marcador en la vista de mapa será visualmente diferente para atraer más atención.</li>
        </ul>
        <p><strong>Tarifas y Facturación:</strong> La suscripción a Cuidamet Premium tiene un coste de 9,99€ al mes (impuestos incluidos). El pago se realizará mensualmente y se renovará automáticamente al final de cada período de facturación, a menos que se cancele. Cuidamet se reserva el derecho de modificar la tarifa de suscripción, notificando a los usuarios con antelación.</p>
        <p><strong>Cancelación:</strong> El Cuidador puede cancelar su suscripción Premium en cualquier momento desde la configuración de su perfil. La cancelación será efectiva al final del período de facturación actual, y el Cuidador continuará disfrutando de los beneficios Premium hasta esa fecha. No se realizarán reembolsos por períodos de suscripción parciales.</p>
      </>
    ),
  },
  {
    id: 'privacy',
    title: 'Política de Privacidad',
    description: 'Cómo recopilamos, usamos y protegemos tus datos.',
    content: (
      <>
        <h2>1. Información que Recopilamos</h2>
        <p>Recopilamos la información que nos proporcionas directamente, como tu nombre, correo electrónico, número de teléfono y dirección al registrarte. También recopilamos datos de uso, información del dispositivo y, con tu permiso, datos de geolocalización.</p>

        <h2>2. Cómo Usamos tu Información</h2>
        <p>Usamos tu información para:</p>
        <ul>
            <li>Proveer, mantener y mejorar nuestro Servicio.</li>
            <li>Conectarte con Cuidadores o familias en tu área.</li>
            <li>Procesar transacciones y enviar notificaciones.</li>
            <li>Personalizar tu experiencia y ofrecerte soporte.</li>
            <li>Garantizar la seguridad de nuestra plataforma.</li>
        </ul>
        
        <h2>3. Cómo Compartimos tu Información</h2>
        <p>Compartimos información entre Usuarios y Cuidadores para facilitar la conexión (por ejemplo, tu nombre y la descripción del servicio que buscas). No compartimos tu información de contacto personal hasta que decidas iniciar una conversación. No vendemos tus datos personales a terceros.</p>

        <h2>4. Seguridad de los Datos</h2>
        <p>Implementamos medidas de seguridad razonables para proteger tu información contra el acceso no autorizado, la alteración o la destrucción. Sin embargo, ningún sistema es 100% seguro.</p>
        
        <h2>5. Tus Derechos</h2>
        <p>Tienes derecho a acceder, rectificar o eliminar tus datos personales. Puedes gestionar tu información desde la configuración de tu perfil o contactándonos directamente.</p>
      </>
    ),
  },
   {
    id: 'cancellation',
    title: 'Política de Cancelación y Reembolso',
    description: 'Condiciones de cancelación para clientes y cuidadores.',
    content: (
      <>
        <h2>Cancelación por el cliente</h2>
        <ul>
            <li><strong>Más de 48h antes del servicio:</strong> Reembolso del 100% del importe, menos una comisión de procesamiento fija de 2€.</li>
            <li><strong>Entre 24 y 48h antes del servicio:</strong> Reembolso del 50% del importe total. El 50% restante se abona al cuidador como compensación.</li>
            <li><strong>Menos de 24h antes del servicio:</strong> Sin reembolso. El importe total se abona al cuidador como compensación por la reserva a corto plazo.</li>
            <li><strong>Emergencia médica justificada:</strong> Se realizará un reembolso del 100% (menos la comisión de 2€) siempre que se presente un justificante médico válido.</li>
        </ul>

        <h2>Cancelación por el cuidador</h2>
        <ul>
            <li><strong>Más de 48h antes del servicio:</strong> Sin penalización. El cliente recibe un reembolso completo y es notificado para buscar una alternativa.</li>
            <li><strong>Menos de 48h antes del servicio:</strong> Se aplica una penalización en la cuenta del cuidador que afectará a su visibilidad en búsquedas futuras. El cliente es notificado inmediatamente para buscar una alternativa y recibe un reembolso completo.</li>
            <li><strong>Reincidencia en cancelaciones:</strong> La cancelación recurrente con poca antelación puede llevar a la suspensión temporal de la cuenta del cuidador.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Política de Cookies',
    description: 'Información sobre las cookies que utilizamos en nuestra app.',
    content: (
     <>
        <h2>1. ¿Qué son las Cookies?</h2>
        <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web o usas una aplicación. Nos ayudan a que el servicio funcione correctamente y a mejorar tu experiencia.</p>

        <h2>2. Tipos de Cookies que Utilizamos</h2>
        <ul>
          <li><strong>Cookies Esenciales:</strong> Son necesarias para el funcionamiento básico de la aplicación, como mantener tu sesión iniciada o procesar pagos. No se pueden desactivar.</li>
          <li><strong>Cookies de Rendimiento y Análisis:</strong> Nos ayudan a entender cómo usas Cuidamet, qué funciones son más populares y cómo podemos mejorar. Estos datos son anónimos.</li>
          <li><strong>Cookies de Funcionalidad:</strong> Permiten recordar tus preferencias, como tu ubicación predeterminada o tus filtros de búsqueda, para ofrecerte una experiencia más personalizada.</li>
        </ul>

        <h2>3. Gestión de Cookies</h2>
        <p>Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador o dispositivo. Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad de la aplicación.</p>
      </>
    ),
  },
  {
    id: 'legal-notice',
    title: 'Aviso Legal',
    description: 'Información corporativa y legal sobre Cuidamet.',
    content: (
        <>
            <p><strong>Denominación Social:</strong> Cuidamet Technologies S.L.</p>
            <p><strong>Domicilio Social:</strong> Calle Ficticia 123, 28080 Madrid, España.</p>
            <p><strong>Email de Contacto:</strong> legal@cuidamet.com</p>
            <p><strong>Datos Registrales:</strong> Inscrita en el Registro Mercantil de Madrid.</p>
        </>
    )
  },
  {
    id: 'licenses',
    title: 'Licencias de Terceros',
    description: 'Créditos y licencias del software que nos ayuda a funcionar.',
    content: (
        <>
            <p>Cuidamet utiliza varias librerías y herramientas de código abierto. Agradecemos a la comunidad de desarrolladores por su contribución.</p>
            <ul>
                <li><strong>React:</strong> Licencia MIT</li>
                <li><strong>Tailwind CSS:</strong> Licencia MIT</li>
                <li><strong>Leaflet:</strong> Licencia BSD-2-Clause</li>
                <li><strong>Unsplash:</strong> Las imágenes se utilizan bajo la Licencia de Unsplash.</li>
            </ul>
        </>
    )
  }
];