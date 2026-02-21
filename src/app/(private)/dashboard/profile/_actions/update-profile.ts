"use server";

import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório.")
    .min(2, "O nome deve conter pelo menos 2 caracteres."),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.boolean(),
  timeZone: z.string(),
  times: z.array(z.string()),
});

type FormSchema = z.infer<typeof formSchema>;

export async function updateProfile(formData: FormSchema) {
  const session = await auth();

  if (!session?.user.id) {
    return {
      error: "Usuário não autenticado.",
    };
  }

  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: "Preencha os campos corretamente.",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        status: formData.status,
        timezone: formData.timeZone,
        times: formData.times ?? [],
      },
    });

    return {
      data: "Perfil atualizado com sucesso.",
    };
  } catch (error) {
    console.error("Erro ao atualizar o perfil do usuário:", error);
    return {
      error:
        "Ocorreu um erro ao atualizar o perfil. Tente novamente mais tarde.",
    };
  }
}
