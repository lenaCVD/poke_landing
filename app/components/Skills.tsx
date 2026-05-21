const skills = [
  { name: "React / Next.js", level: "Starting", percent: 15 },
  { name: "TypeScript", level: "Starting", percent: 20 },
  { name: "CSS / Tailwind", level: "Starting", percent: 70 },
  { name: "REST APIs", level: "Starting", percent: 20 },
];

export default function Skills() {
    return (
        <section id="skills" className="mt-auto px-6 py-16">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-8 pb-4 border-b border-black/10">
                My actual skills in frontend development
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 border border-black/10 rounded-lg overflow-hidden">
                {skills.map((skill) => (
                    <div
                        key={skill.name}
                        className="p-5 border-r border-b border-black/10 last:border-r-0"
                    >
                        <p className="text-sm mb-1">{skill.name}</p>
                        <p className="text-xs text-gray-400 mb-3">{skill.level}</p>
                        <div className="w-full h-px bg-black/10">
                            <div
                                className="h-px bg-black"
                                style={{ width: `${skill.percent}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}