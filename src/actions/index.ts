import { ActionError, defineAction } from "astro:actions";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.PUBLIC_RESEND_API_KEY)

export const server = {
    send: defineAction({
        accept: "form",
        handler: async (ctx: FormData) => {
            const name = ctx.get('name')
            const email = ctx.get('email')
            const message = ctx.get('message')

            const { data, error } = await resend.emails.send({
                from: `${name} <onboarding@resend.dev>`,
                to: ["ibarra.jefferson1@gmail.com"],
                subject: "Nuevo mensaje desde el formulario de contacto",
                html: `
                        <h2>Has recibido un nuevo mensaje</h2>
                        <p><strong>Nombre:</strong> ${name}</p>
                        <p><strong>Correo:</strong> ${email}</p>
                        <p><strong>Mensaje:</strong><br/>${message}</p>
                        `,
            })

            if (error) {
                throw new ActionError({
                    code: "BAD_REQUEST",
                    message: error.message,
                })
            }

        }
    })
}