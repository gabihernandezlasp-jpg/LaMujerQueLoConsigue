import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | La Mujer Que Lo Consigue",
};

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-serif text-3xl font-semibold text-espresso sm:text-4xl">
        Política de Privacidad
      </h1>
      <p className="mt-2 text-sm text-espresso/60">
        Última actualización: 6 de septiembre de 2026
      </p>

      <div className="mt-8 space-y-8 text-espresso/80">
        <section>
          <h2 className="font-serif text-xl font-semibold text-espresso">
            1. Responsable del tratamiento
          </h2>
          <p className="mt-3">
            COACHINGCONPATY LTD, con número de registro 16912226 y domicilio
            en 27A Hambalt Road, Londres, SW4 9EA, Reino Unido, es la
            responsable del tratamiento de los datos que nos facilitas a
            través de este sitio web.
          </p>
          <p className="mt-3">
            Puedes contactarnos para cualquier cuestión relacionada con la
            privacidad en:{" "}
            <a
              href="mailto:patyvaleroarias@gmail.com"
              className="underline hover:text-terracotta-600"
            >
              patyvaleroarias@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-espresso">
            2. Qué datos recogemos
          </h2>
          <p className="mt-3">
            Al inscribirte en el retiro &ldquo;La Mujer Que Lo Consigue&rdquo;
            a través de nuestro formulario de inscripción, recogemos:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Nombre y apellidos</li>
            <li>Email</li>
            <li>Número de WhatsApp</li>
            <li>El deseo que sientes que no estás logrando conseguir</li>
            <li>Tu expectativa sobre el retiro</li>
          </ul>
          <p className="mt-3">
            Los datos de pago (tarjeta u otro medio) se introducen y procesan
            directamente en la pasarela segura de Stripe. Nosotros no
            almacenamos ni tenemos acceso a los datos completos de tu
            tarjeta.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-espresso">
            3. Finalidad y base legal
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Gestionar tu inscripción y el pago del retiro</strong>,
              y darte acceso al programa (workbook, meditaciones,
              grabaciones): necesario para ejecutar el contrato entre tú y
              nosotros.
            </li>
            <li>
              <strong>Comunicarnos contigo sobre el retiro</strong> (accesos,
              horarios, cambios, materiales) por email y WhatsApp: necesario
              para ejecutar ese mismo contrato.
            </li>
            <li>
              <strong>Enviarte comunicaciones comerciales</strong> sobre
              futuros contenidos, ofertas y programas, solo si marcaste la
              casilla correspondiente en el formulario: basado en tu
              consentimiento, que puedes retirar en cualquier momento.
            </li>
            <li>
              <strong>Cumplir obligaciones legales</strong> (por ejemplo,
              facturación y contabilidad): necesario para cumplir con la
              normativa aplicable.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-espresso">
            4. Con quién compartimos tus datos
          </h2>
          <p className="mt-3">
            No vendemos tus datos ni los cedemos a terceros para fines
            distintos a los descritos en esta política. Sí trabajamos con
            proveedores que tratan datos en nuestro nombre:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>
              <strong>Stripe</strong> — procesa el pago de tu inscripción de
              forma segura.
            </li>
            <li>
              <strong>Brevo</strong> — plataforma que usamos para enviar
              emails y mensajes de WhatsApp relacionados con el retiro y,
              si diste tu consentimiento, comunicaciones comerciales.
            </li>
            <li>
              <strong>Vercel</strong> — aloja este sitio web y procesa datos
              técnicos de navegación necesarios para su funcionamiento.
            </li>
          </ul>
          <p className="mt-3">
            Algunos de estos proveedores pueden tratar datos fuera del Reino
            Unido y del Espacio Económico Europeo (por ejemplo, en Estados
            Unidos). Cuando esto ocurre, se aplican garantías reconocidas
            legalmente, como las Cláusulas Contractuales Tipo.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-espresso">
            5. Cuánto tiempo conservamos tus datos
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>
              Datos de inscripción: mientras dure la organización del retiro
              y, después, el tiempo necesario para cumplir con obligaciones
              legales (por ejemplo, fiscales).
            </li>
            <li>
              Datos de marketing: hasta que retires tu consentimiento o
              solicites la baja de las comunicaciones.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-espresso">
            6. Tus derechos
          </h2>
          <p className="mt-3">
            Tienes derecho a acceder a tus datos, rectificarlos, solicitar su
            supresión, limitar u oponerte a su tratamiento, y pedir su
            portabilidad. También puedes retirar tu consentimiento en
            cualquier momento sin que ello afecte a la licitud del
            tratamiento previo. Para ejercer cualquiera de estos derechos,
            escríbenos a{" "}
            <a
              href="mailto:patyvaleroarias@gmail.com"
              className="underline hover:text-terracotta-600"
            >
              patyvaleroarias@gmail.com
            </a>
            .
          </p>
          <p className="mt-3">
            Si consideras que no hemos tratado tus datos correctamente,
            puedes presentar una reclamación ante la Agencia Española de
            Protección de Datos (
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-terracotta-600"
            >
              www.aepd.es
            </a>
            ) o ante la autoridad de protección de datos de tu país de
            residencia.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-espresso">
            7. Menores de edad
          </h2>
          <p className="mt-3">
            Este retiro está dirigido a personas mayores de 18 años. No
            recogemos conscientemente datos de menores de edad.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-espresso">
            8. Seguridad
          </h2>
          <p className="mt-3">
            Aplicamos medidas técnicas y organizativas razonables para
            proteger tus datos frente a accesos no autorizados, pérdida o
            alteración.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-espresso">
            9. Cookies
          </h2>
          <p className="mt-3">
            Esta web no utiliza cookies de analítica ni de publicidad. Si en
            el futuro incorporamos alguna, actualizaremos esta política y
            solicitaremos tu consentimiento cuando sea necesario.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-espresso">
            10. Cambios en esta política
          </h2>
          <p className="mt-3">
            Podemos actualizar esta política para reflejar cambios legales u
            operativos. La fecha de la última actualización aparece al
            inicio de este documento.
          </p>
        </section>
      </div>

      <p className="mt-10">
        <Link href="/" className="underline hover:text-terracotta-600">
          Volver a la página principal
        </Link>
      </p>
    </main>
  );
}
