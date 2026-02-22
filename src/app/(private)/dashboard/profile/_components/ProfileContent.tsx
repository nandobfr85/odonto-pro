"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { ProfileFormData, useProfileForm } from "./ProfileForm";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import imgMock from "@/../public/medic_default.png";
import { cn } from "@/lib/utils";

import { Prisma } from "@/generated/prisma/browser";
import { updateProfile } from "../_actions/update-profile";
import { extractPhoneNumber, formatPhone } from "@/utils/formatPhone";

type UserWithSubscription = Prisma.UserGetPayload<{
  include: { subscription: true };
}>;

interface ProfileContentProps {
  user: UserWithSubscription;
}

export const ProfileContent = ({ user }: ProfileContentProps) => {
  const [selectedHours, setSelectedHours] = useState<string[]>(
    user.times ?? [],
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const form = useProfileForm({
    name: user.name,
    address: user.address,
    phone: user.phone,
    status: user.status,
    timeZone: user.timezone,
  });

  function generateTimeSlots(): string[] {
    const hours: string[] = [];

    for (let i = 8; i <= 24; i++) {
      for (let j = 0; j < 2; j++) {
        const hour = i.toString().padStart(2, "0");
        const minute = (j * 30).toString().padStart(2, "0");

        hours.push(`${hour}:${minute}`);
      }
    }

    return hours;
  }

  const hours = generateTimeSlots();

  function toggleHour(hour: string) {
    setSelectedHours((prev) =>
      prev.includes(hour)
        ? prev.filter((h) => h !== hour)
        : [...prev, hour].sort(),
    );
  }

  const timeZones = Intl.supportedValuesOf("timeZone").filter(
    (zone) =>
      zone.startsWith("America/Sao_Paulo") ||
      zone.startsWith("America/Fortaleza") ||
      zone.startsWith("America/Recife") ||
      zone.startsWith("America/Bahia") ||
      zone.startsWith("America/Belem") ||
      zone.startsWith("America/Manaus") ||
      zone.startsWith("America/Cuiaba") ||
      zone.startsWith("America/Boa_Vista"),
  );

  async function onSubmit(values: ProfileFormData) {
    const response = await updateProfile({
      name: values.name,
      address: values.address,
      phone: extractPhoneNumber(values.phone ?? ""),
      status: values.status === "active" ? true : false,
      timeZone: values.timeZone,
      times: selectedHours,
    });

    if (response.error) {
      toast.error(response.error);
    }

    toast.success("Perfil atualizado com sucesso!");
  }

  return (
    <div className="mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Meu Perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden">
                  <Image
                    src={user.image ? user.image : imgMock}
                    alt="Imagem de perfil da clínica."
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite o nome da clínica"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite o endereço da clínica"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="(XX) XXXXX-XXXX"
                          onChange={(e) => {
                            const formattedValue = formatPhone(e.target.value);
                            field.onChange(formattedValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status da Clínica</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value ? "active" : "inactive"}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o status da clínica" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">
                              Ativo (Clínica Aberta)
                            </SelectItem>
                            <SelectItem value="inactive">
                              Inativo (Clínica Fechada)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label>Configurar horários de funcionamento</Label>

                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full font-normal justify-between"
                      >
                        Clique aqui para selecionar horários
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Horários de Funcionamento</DialogTitle>
                        <DialogDescription>
                          Selecione os horários de funcionamento da clínica.
                        </DialogDescription>
                      </DialogHeader>
                      <section className="py-4">
                        <p className="text-sm text-muted-foreground mb-2">
                          Clique nos horários abaixo para marcar ou desmarcar:
                        </p>

                        <div className="grid grid-cols-5 gap-2">
                          {hours.map((hour) => (
                            <Button
                              key={hour}
                              variant="outline"
                              className={cn(
                                "h-10 cursor-pointer font-normal",
                                selectedHours.includes(hour) &&
                                  "border-emerald-500 font-semibold border-2",
                              )}
                              onClick={() => toggleHour(hour)}
                            >
                              {hour}
                            </Button>
                          ))}
                        </div>
                      </section>

                      <Button
                        className="w-full cursor-pointer"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Fechar
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>

                <FormField
                  control={form.control}
                  name="timeZone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fuso Horário</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o fuso horário" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeZones.map((zone) => (
                              <SelectItem key={zone} value={zone}>
                                {zone}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600"
                >
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};
