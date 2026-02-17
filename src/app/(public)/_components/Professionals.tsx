import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import defaultDoctorImage from "../../../../public/medic_default.png";

export function Professionals() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-center mb-12 font-bold">
          Clínicas Disponíveis
        </h2>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-0 overflow-hidden">
            <CardContent className="p-0">
              <div>
                <div className="relative h-48">
                  <Image
                    src={defaultDoctorImage}
                    alt="Imagem padrão de um médico com uma seringa na mão."
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Clínica Exemplo</h3>
                      <p className="text-sm text-gray-500">
                        Rua X, Centro, Campo Grande - MS
                      </p>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <Link
                    href="/clinica/123"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center py-2 rounded-md text-sm md:text-base font-medium"
                  >
                    Agendar horário
                    <ArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </section>
  );
}
