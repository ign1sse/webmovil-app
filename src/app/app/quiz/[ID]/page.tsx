'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Send } from 'lucide-react'

interface Opcion {
    id: number;
    texto: string;
}

interface Pregunta {
    id: number;
    titulo: string;
    observacion: string;
    opciones: Opcion[];
}

interface Seccion {
    id: number;
    titulo: string;
    preguntas: Pregunta[];
}

interface Cuestionario {
    titulo: string;
    secciones: Seccion[];
}

// Este sería el cuestionario creado en el componente anterior
const cuestionarioEjemplo: Cuestionario = {
    titulo: "Encuesta de Satisfacción del Cliente",
    secciones: [
        {
            id: 1,
            titulo: "Información General",
            preguntas: [
                {
                    id: 1,
                    titulo: "¿Con qué frecuencia utiliza nuestro producto?",
                    observacion: "Piense en su uso promedio durante el último mes",
                    opciones: [
                        { id: 1, texto: "Diariamente" },
                        { id: 2, texto: "Semanalmente" },
                        { id: 3, texto: "Mensualmente" },
                        { id: 4, texto: "Raramente" }
                    ]
                },
                {
                    id: 2,
                    titulo: "¿Cuál es su característica favorita de nuestro producto?",
                    observacion: "",
                    opciones: [
                        { id: 1, texto: "Facilidad de uso" },
                        { id: 2, texto: "Diseño" },
                        { id: 3, texto: "Funcionalidad" },
                        { id: 4, texto: "Soporte al cliente" }
                    ]
                }
            ]
        },
        {
            id: 2,
            titulo: "Satisfacción del Producto",
            preguntas: [
                {
                    id: 3,
                    titulo: "¿Qué tan satisfecho está con nuestro producto?",
                    observacion: "En una escala del 1 al 5, donde 5 es muy satisfecho",
                    opciones: [
                        { id: 1, texto: "1 - Muy insatisfecho" },
                        { id: 2, texto: "2 - Insatisfecho" },
                        { id: 3, texto: "3 - Neutral" },
                        { id: 4, texto: "4 - Satisfecho" },
                        { id: 5, texto: "5 - Muy satisfecho" }
                    ]
                },
                {
                    id: 4,
                    titulo: "¿Recomendaría nuestro producto a otros?",
                    observacion: "",
                    opciones: [
                        { id: 1, texto: "Definitivamente sí" },
                        { id: 2, texto: "Probablemente sí" },
                        { id: 3, texto: "No estoy seguro" },
                        { id: 4, texto: "Probablemente no" },
                        { id: 5, texto: "Definitivamente no" }
                    ]
                }
            ]
        }
    ]
};

export async function generateStaticParams() {
    // Reemplaza con tus IDs reales
    const IDs = ['0', '1', '2'];
    return IDs.map((id) => ({ ID: id }));
}

export default function ResponderCuestionario() {
    const [seccionActual, setSeccionActual] = useState(0);
    const [respuestas, setRespuestas] = useState<Record<number, number>>({});

    const avanzarSeccion = () => {
        if (seccionActual < cuestionarioEjemplo.secciones.length - 1) {
            setSeccionActual(seccionActual + 1);
        } else {
            enviarRespuestas();
        }
    };

    const retrocederSeccion = () => {
        if (seccionActual > 0) {
            setSeccionActual(seccionActual - 1);
        }
    };

    const manejarRespuesta = (preguntaId: number, opcionId: number) => {
        setRespuestas(prev => ({ ...prev, [preguntaId]: opcionId }));
    };

    const enviarRespuestas = () => {
        console.log("Respuestas enviadas:", respuestas);
        // Aquí iría la lógica para enviar las respuestas al servidor
        alert("¡Gracias por completar el cuestionario!");
    };

    const seccionActualData = cuestionarioEjemplo.secciones[seccionActual];

    return (
        <div className="bg-white">
            <Card className="max-w-4xl mx-auto border-none">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-orange-500 to-fuchsia-600 text-transparent bg-clip-text">
                        {cuestionarioEjemplo.titulo}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-semibold mb-4">{seccionActualData.titulo}</h2>
                    {seccionActualData.preguntas.map((pregunta, index) => (
                        <div key={pregunta.id} className="mb-6">
                            <h3 className="text-lg font-medium mb-2">{`${index + 1}. ${pregunta.titulo}`}</h3>
                            {pregunta.observacion && (
                                <p className="text-sm text-muted-foreground mb-2">{pregunta.observacion}</p>
                            )}
                            <RadioGroup
                                onValueChange={(value) => manejarRespuesta(pregunta.id, parseInt(value))}
                                value={respuestas[pregunta.id]?.toString()}
                            >
                                {pregunta.opciones.map((opcion) => (
                                    <div key={opcion.id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={opcion.id.toString()} id={`p${pregunta.id}-o${opcion.id}`} />
                                        <Label htmlFor={`p${pregunta.id}-o${opcion.id}`}>{opcion.texto}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        onClick={retrocederSeccion}
                        disabled={seccionActual === 0}
                        variant="outline"
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
                    </Button>
                    <Button
                        onClick={avanzarSeccion}
                        className="bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white"
                    >
                        {seccionActual === cuestionarioEjemplo.secciones.length - 1 ? (
                            <>
                                Finalizar <Send className="ml-2 h-4 w-4" />
                            </>
                        ) : (
                            <>
                                Siguiente <ChevronRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}