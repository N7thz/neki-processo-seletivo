import z from "zod"

export const FormRegisterUserSchema = z.object({

    username: z.string().nonempty({
        message: "O username é obrigátorio."
    }),
    email: z.string().nonempty({
        message: "O e-mail é obrigátorio."
    }).email(),
    password: z.string().nonempty({
        message: "A senha é obrigátoria."
    }).min(6, {
        message: "A senha deve ter pelo menos 6 caracteres."
    }),
    confirm_password: z.string().nonempty({
        message: "A confirmação da senha é obrigátoria."
    })
}).refine((data) => data.confirm_password === data.password, {
    message: "As senhas devem ser iguais",
    path: ["confirm_password"],
});

export const FormLoginSchema = z.object({

    email: z.string().nonempty({
        message: "O e-mail é obrigátorio."
    }).email(),
    password: z.string().nonempty({
        message: "A senha é obrigátoria."
    }).min(6, {
        message: "A senha deve ter pelo menos 6 caracteres."
    })
})

export const FormRegisterSkillSchema = z.object({

    name: z.string().nonempty({
        message: "O nome da skill é obrigátorio."
    }),
    description: z.string().nonempty({
        message: "A description da skill é obrigátorio."
    }),
    imageURL: z.string().nonempty({
        message: "A imagem da skill é obrigátorio."
    }),
    level: z.string().min(1, {
        message: "O valor minimo é 1"
    })
})

