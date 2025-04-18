import './_astro_actions_Bx89JxZM.mjs';
import { Resend } from 'resend';
import { z } from 'zod';
import { A as AstroError, p as ActionCalledFromServerError } from './astro/assets-service_BRr-qnMP.mjs';
import { c as callSafely, a as ActionError, b as ActionInputError } from './shared_BCgKBF-k.mjs';

function defineAction({
  accept,
  input: inputSchema,
  handler
}) {
  const serverHandler = accept === "form" ? getFormServerHandler(handler, inputSchema) : getJsonServerHandler(handler, inputSchema);
  async function safeServerHandler(unparsedInput) {
    if (typeof this === "function") {
      throw new AstroError(ActionCalledFromServerError);
    }
    return callSafely(() => serverHandler(unparsedInput, this));
  }
  Object.assign(safeServerHandler, {
    orThrow(unparsedInput) {
      if (typeof this === "function") {
        throw new AstroError(ActionCalledFromServerError);
      }
      return serverHandler(unparsedInput, this);
    }
  });
  return safeServerHandler;
}
function getFormServerHandler(handler, inputSchema) {
  return async (unparsedInput, context) => {
    if (!(unparsedInput instanceof FormData)) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts FormData."
      });
    }
    if (!(inputSchema instanceof z.ZodObject)) return await handler(unparsedInput, context);
    const parsed = await inputSchema.safeParseAsync(formDataToObject(unparsedInput, inputSchema));
    if (!parsed.success) {
      throw new ActionInputError(parsed.error.issues);
    }
    return await handler(parsed.data, context);
  };
}
function getJsonServerHandler(handler, inputSchema) {
  return async (unparsedInput, context) => {
    if (unparsedInput instanceof FormData) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts JSON."
      });
    }
    if (!inputSchema) return await handler(unparsedInput, context);
    const parsed = await inputSchema.safeParseAsync(unparsedInput);
    if (!parsed.success) {
      throw new ActionInputError(parsed.error.issues);
    }
    return await handler(parsed.data, context);
  };
}
function formDataToObject(formData, schema) {
  const obj = {};
  for (const [key, baseValidator] of Object.entries(schema.shape)) {
    let validator = baseValidator;
    while (validator instanceof z.ZodOptional || validator instanceof z.ZodNullable || validator instanceof z.ZodDefault) {
      if (validator instanceof z.ZodDefault && !formData.has(key)) {
        obj[key] = validator._def.defaultValue();
      }
      validator = validator._def.innerType;
    }
    if (!formData.has(key) && key in obj) {
      continue;
    } else if (validator instanceof z.ZodBoolean) {
      const val = formData.get(key);
      obj[key] = val === "true" ? true : val === "false" ? false : formData.has(key);
    } else if (validator instanceof z.ZodArray) {
      obj[key] = handleFormDataGetAll(key, formData, validator);
    } else {
      obj[key] = handleFormDataGet(key, formData, validator, baseValidator);
    }
  }
  return obj;
}
function handleFormDataGetAll(key, formData, validator) {
  const entries = Array.from(formData.getAll(key));
  const elementValidator = validator._def.type;
  if (elementValidator instanceof z.ZodNumber) {
    return entries.map(Number);
  } else if (elementValidator instanceof z.ZodBoolean) {
    return entries.map(Boolean);
  }
  return entries;
}
function handleFormDataGet(key, formData, validator, baseValidator) {
  const value = formData.get(key);
  if (!value) {
    return baseValidator instanceof z.ZodOptional ? void 0 : null;
  }
  return validator instanceof z.ZodNumber ? Number(value) : value;
}

const resend = new Resend("re_jLpwHXgW_EKp3j2xriw3Wy9B2fs5USHSN");
const server = {
  send: defineAction({
    accept: "form",
    handler: async (ctx) => {
      const name = ctx.get("name");
      const email = ctx.get("email");
      const message = ctx.get("message");
      const result = await resend.emails.send({
        from: `${name} <onboarding@resend.dev>`,
        to: ["ibarra.jefferson1@gmail.com"],
        subject: "Nuevo mensaje desde el formulario de contacto",
        html: `
                        <h2>Has recibido un nuevo mensaje</h2>
                        <p><strong>Nombre:</strong> ${name}</p>
                        <p><strong>Correo:</strong> ${email}</p>
                        <p><strong>Mensaje:</strong><br/>${message}</p>
                        `
      });
      if (result.error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: result.error.message
        });
      }
    }
  })
};

export { server };
