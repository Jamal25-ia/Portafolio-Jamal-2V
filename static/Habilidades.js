window.addEventListener('DOMContentLoaded', () => {
    // Lista de habilidades con sus imágenes (tal cual las tenías)
    const skills = [
        { name: "HTML", image: "html.webp" },
        { name: "CSS", image: "css.png" },
        { name: "Javascript", image: "Javascript.png" },
        { name: "Python", image: "python.webp" },
        { name: "Bootstrap", image: "bootstrap.png" },
        { name: "Flask", image: "flask.png" },
        { name: "MySQL", image: "mysql.png" },
        { name: "MongoDB", image: "mongodb.png" },
        { name: "Firebase", image: "firebase.png" },
        { name: "PySide2", image: "pyside2.png" },
        { name: "Tkinter", image: "tkinter.png" },
        { name: "Godot", image: "godot.png" },
        { name: "Flutter", image: "flutter.webp" }
    ];

    // Mapeo de nombres de etiquetas a nombres de habilidad
    const tagToSkill = {
        "html": "HTML",
        "css": "CSS",
        "js": "Javascript",
        "javascript": "Javascript",
        "python": "Python",
        "bootstrap": "Bootstrap",
        "flask": "Flask",
        "mysql": "MySQL",
        "mongodb": "MongoDB",
        "firebase": "Firebase",
        "pyside2": "PySide2",
        "tkinter": "Tkinter",
        "godot": "Godot",
        "flutter": "Flutter"
    };

    // Contar proyectos por habilidad
    const countBySkill = {};
    skills.forEach(s => countBySkill[s.name] = 0);

    document.querySelectorAll('.proyecto-item').forEach(proyecto => {
        const tags = proyecto.getAttribute('data-tags').toLowerCase().split(/\s+/);
        tags.forEach(tag => {
            const skillName = tagToSkill[tag];
            if (skillName) {
                countBySkill[skillName]++;
            }
        });
    });

    // Preparar datos para Chart.js
    const labels = skills.map(s => s.name);
    const data = skills.map(s => countBySkill[s.name] || 0);

    console.table(countBySkill);

    // Crear gráfico radar
    const container = document.getElementById('skills-container');
    container.innerHTML = '<canvas id="skillsChart" height="400"></canvas>';

    Chart.register(ChartDataLabels);   // <-- activamos el plugin

    new Chart(document.getElementById('skillsChart'), {
        type: 'radar',
        data: {
            labels: skills.map(s => s.name),
            datasets: [{
                label: 'Proyectos',
                data: skills.map(s => countBySkill[s.name] || 0),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointRadius: 8,
                datalabels: {   // ← nativo de Chart.js v4
                    display: true,
                    color: '#000',
                    font: { weight: 'bold', size: 14 },
                    formatter: (value) => value
                }
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        title: ctx => ctx[0].label,
                        label: ctx => `${ctx.parsed.r} proyecto${ctx.parsed.r !== 1 ? 's' : ''}`
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
});