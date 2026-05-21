"use client";

import { useState } from "react";

interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
    types: { type: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
}

const statNames: Record<string, string> = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    speed: "SPD",
};

export default function PokeSearch() {
    const [query, setQuery] = useState("");
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function fetchPokemon(value: string | number) {
        setLoading(true);
        setError(false);
        setPokemon(null);

        try {
            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${value}`
            );
            if (!res.ok) throw new Error();
            const data = await res.json();
            setPokemon(data);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    function handleSearch() {
        if (!query.trim()) return;
        fetchPokemon(query.trim().toLowerCase());
    }

    function handleRandom() {
        const id = Math.floor(Math.random() * 898) + 1;
        fetchPokemon(id);
    }

    return (
        <section id="api" className="px-6 py-16">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-8 pb-4 border-b border-black/10">
                Integración PokéAPI — Proyecto demo
            </p>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="pikachu, charizard, bulbasaur…"
                    className="flex-1 px-4 py-2 text-sm border border-black/10 rounded-md outline-none focus:border-black/30 transition-colors"
                />
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="px-4 py-2 text-xs tracking-widest uppercase bg-black text-white rounded-md hover:opacity-75 disabled:opacity-40 transition-opacity"
                >
                    Buscar
                </button>
                <button
                    onClick={handleRandom}
                    disabled={loading}
                    className="px-4 py-2 text-xs tracking-widest uppercase border border-black/20 rounded-md hover:bg-black/5 disabled:opacity-40 transition-colors"
                >
                    Random
                </button>
            </div>

            {loading && (
                <p className="text-xs text-gray-400 tracking-widest">
                    Consultando PokéAPI…
                </p>
            )}

            {error && (
                <p className="text-xs text-gray-400 border border-black/10 rounded-md p-4 text-center">
                    Pokémon no encontrado. Prueba con otro nombre.
                </p>
            )}

            {pokemon && (
                <div className="grid grid-cols-[140px_1fr] gap-6 border border-black/10 rounded-lg p-6">
                    <div className="bg-gray-50 rounded-md flex items-center justify-center h-36">
                        <img
                            src={pokemon.sprites.other["official-artwork"].front_default}
                            alt={pokemon.name}
                            className="w-28 h-28 object-contain"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-serif capitalize tracking-tight mb-1">
                            {pokemon.name}
                        </h2>
                        <p className="text-xs text-gray-400 tracking-widest mb-4">
                            #{String(pokemon.id).padStart(3, "0")} ·{" "}
                            {pokemon.base_experience ?? "—"} exp base
                        </p>
                        <div className="flex gap-2 mb-4 flex-wrap">
                            {pokemon.types.map((t) => (
                                <span
                                    key={t.type.name}
                                    className="text-xs tracking-widest uppercase px-3 py-1 border border-black/20 rounded-sm text-gray-500"
                                >
                                    {t.type.name}
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2">
                            {pokemon.stats
                                .filter((s) => statNames[s.stat.name])
                                .map((s) => (
                                    <div
                                        key={s.stat.name}
                                        className="grid grid-cols-[60px_28px_1fr] items-center gap-2"
                                    >
                                        <span className="text-xs text-gray-400 uppercase tracking-widest">
                                            {statNames[s.stat.name]}
                                        </span>
                                        <span className="text-xs text-right">{s.base_stat}</span>
                                        <div className="h-px bg-black/10">
                                            <div
                                                className="h-px bg-black/50"
                                                style={{
                                                    width: `${Math.min(100, s.base_stat / 2)}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}