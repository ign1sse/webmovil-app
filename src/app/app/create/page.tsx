'use client';

import { useState } from 'react'
import Link from 'next/link';
import { PlusCircle, ArrowUp, ArrowDown, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

export default function CrearCuestionario() {
    const [cuestionario, setCuestionario] = useState<Cuestionario>({
        titulo: '',
        secciones: []
    });

    const agregarSeccion = () => {
        setCuestionario(prev => ({
            ...prev,
            secciones: [...prev.secciones, { id: Date.now(), titulo: '', preguntas: [] }]
        }));
    };

    const agregarPregunta = (seccionId: number) => {
        setCuestionario(prev => ({
            ...prev,
            secciones: prev.secciones.map(seccion =>
                seccion.id === seccionId
                    ? { ...seccion, preguntas: [...seccion.preguntas, { id: Date.now(), titulo: '', observacion: '', opciones: [] }] }
                    : seccion
            )
        }));
    };

    const agregarOpcion = (seccionId: number, preguntaId: number) => {
        setCuestionario(prev => ({
            ...prev,
            secciones: prev.secciones.map(seccion =>
                seccion.id === seccionId
                    ? {
                        ...seccion,
                        preguntas: seccion.preguntas.map(pregunta =>
                            pregunta.id === preguntaId
                                ? { ...pregunta, opciones: [...pregunta.opciones, { id: Date.now(), texto: '' }] }
                                : pregunta
                        )
                    }
                    : seccion
            )
        }));
    };

    const actualizarTituloCuestionario = (titulo: string) => {
        setCuestionario(prev => ({ ...prev, titulo }));
    };

    const actualizarTituloSeccion = (seccionId: number, titulo: string) => {
        setCuestionario(prev => ({
            ...prev,
            secciones: prev.secciones.map(seccion =>
                seccion.id === seccionId ? { ...seccion, titulo } : seccion
            )
        }));
    };

    const actualizarPregunta = (seccionId: number, preguntaId: number, campo: 'titulo' | 'observacion', valor: string) => {
        setCuestionario(prev => ({
            ...prev,
            secciones: prev.secciones.map(seccion =>
                seccion.id === seccionId
                    ? {
                        ...seccion,
                        preguntas: seccion.preguntas.map(pregunta =>
                            pregunta.id === preguntaId ? { ...pregunta, [campo]: valor } : pregunta
                        )
                    }
                    : seccion
            )
        }));
    };

    const actualizarOpcion = (seccionId: number, preguntaId: number, opcionId: number, texto: string) => {
        setCuestionario(prev => ({
            ...prev,
            secciones: prev.secciones.map(seccion =>
                seccion.id === seccionId
                    ? {
                        ...seccion,
                        preguntas: seccion.preguntas.map(pregunta =>
                            pregunta.id === preguntaId
                                ? {
                                    ...pregunta,
                                    opciones: pregunta.opciones.map(opcion =>
                                        opcion.id === opcionId ? { ...opcion, texto } : opcion
                                    )
                                }
                                : pregunta
                        )
                    }
                    : seccion
            )
        }));
    };

    const moverPregunta = (seccionId: number, preguntaId: number, direccion: 'arriba' | 'abajo') => {
        setCuestionario(prev => ({
            ...prev,
            secciones: prev.secciones.map(seccion => {
                if (seccion.id === seccionId) {
                    const index = seccion.preguntas.findIndex(p => p.id === preguntaId);
                    if (index === -1) return seccion;
                    const nuevasPreguntas = [...seccion.preguntas];
                    const nuevaPos = direccion === 'arriba' ? index - 1 : index + 1;
                    if (nuevaPos >= 0 && nuevaPos < nuevasPreguntas.length) {
                        [nuevasPreguntas[index], nuevasPreguntas[nuevaPos]] = [nuevasPreguntas[nuevaPos], nuevasPreguntas[index]];
                    }
                    return { ...seccion, preguntas: nuevasPreguntas };
                }
                return seccion;
            })
        }));
    };

    const eliminarPregunta = (seccionId: number, preguntaId: number) => {
        setCuestionario(prev => ({
            ...prev,
            secciones: prev.secciones.map(seccion =>
                seccion.id === seccionId
                    ? { ...seccion, preguntas: seccion.preguntas.filter(pregunta => pregunta.id !== preguntaId) }
                    : seccion
            )
        }));
    };

    const totalPreguntas = cuestionario.secciones.reduce((total, seccion) => total + seccion.preguntas.length, 0);

    return (
        <div className="bg-white">
            <div className='px-6 py-2'>
                <Link href="/app" className='flex items-center gap-2 w-max'>
                    <span className='material-symbols-outlined'>
                        arrow_back
                    </span>
                    <span>
                        Volver
                    </span>
                </Link>
            </div>
            <Card className="max-w-4xl mx-auto border-none">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-orange-500 to-fuchsia-600 text-transparent bg-clip-text">
                        Crear Nuevo Cuestionario
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <Input
                            placeholder="Título del cuestionario"
                            value={cuestionario.titulo}
                            onChange={(e) => actualizarTituloCuestionario(e.target.value)}
                            className="text-xl font-semibold"
                        />

                        <div className="bg-orange-100 rounded-md p-4 text-orange-800">
                            <p>Total de secciones: {cuestionario.secciones.length}</p>
                            <p>Total de preguntas: {totalPreguntas}</p>
                        </div>

                        {cuestionario.secciones.map((seccion, seccionIndex) => (
                            <Card key={seccion.id} className="mt-6">
                                <CardHeader>
                                    <Input
                                        placeholder={`Título de la sección ${seccionIndex + 1}`}
                                        value={seccion.titulo}
                                        onChange={(e) => actualizarTituloSeccion(seccion.id, e.target.value)}
                                        className="text-lg font-semibold"
                                    />
                                </CardHeader>
                                <CardContent>
                                    {seccion.preguntas.map((pregunta, preguntaIndex) => (
                                        <div key={pregunta.id} className="mb-6 p-4 border rounded-md">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-semibold text-lg">{`${preguntaIndex + 1}.`}</span>
                                                <div>
                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        onClick={() => moverPregunta(seccion.id, pregunta.id, 'arriba')}
                                                        disabled={preguntaIndex === 0}
                                                        className="mr-2"
                                                    >
                                                        <ArrowUp className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        onClick={() => moverPregunta(seccion.id, pregunta.id, 'abajo')}
                                                        disabled={preguntaIndex === seccion.preguntas.length - 1}
                                                        className="mr-2"
                                                    >
                                                        <ArrowDown className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="destructive"
                                                        onClick={() => eliminarPregunta(seccion.id, pregunta.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <Input
                                                placeholder="Título de la pregunta"
                                                value={pregunta.titulo}
                                                onChange={(e) => actualizarPregunta(seccion.id, pregunta.id, 'titulo', e.target.value)}
                                                className="mb-2"
                                            />
                                            <Textarea
                                                placeholder="Observación (opcional)"
                                                value={pregunta.observacion}
                                                onChange={(e) => actualizarPregunta(seccion.id, pregunta.id, 'observacion', e.target.value)}
                                                className="mb-2"
                                            />
                                            {pregunta.opciones.map((opcion, opcionIndex) => (
                                                <Input
                                                    key={opcion.id}
                                                    placeholder={`Opción ${opcionIndex + 1}`}
                                                    value={opcion.texto}
                                                    onChange={(e) => actualizarOpcion(seccion.id, pregunta.id, opcion.id, e.target.value)}
                                                    className="mb-2"
                                                />
                                            ))}
                                            <Button
                                                onClick={() => agregarOpcion(seccion.id, pregunta.id)}
                                                className="mt-2 bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white"
                                            >
                                                <PlusCircle className="mr-2 h-4 w-4" /> Agregar Opción
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        onClick={() => agregarPregunta(seccion.id)}
                                        className="mt-4 bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white"
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" /> Agregar Pregunta
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}

                        <Button onClick={agregarSeccion} className="w-full bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white">
                            <PlusCircle className="mr-2 h-4 w-4" /> Agregar Sección
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}