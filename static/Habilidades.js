window.addEventListener('DOMContentLoaded', () => {
    // Lista original de habilidades con sus imágenes
    const skills = [
        { name: "HTML",      image: "html.webp" },
        { name: "CSS",       image: "css.png" },
        { name: "Javascript",image: "Javascript.png" },
        { name: "Python",    image: "python.webp" },
        { name: "Bootstrap", image: "bootstrap.png" },
        { name: "Flask",     image: "flask.png" },
        { name: "MySQL",     image: "mysql.png" },
        { name: "MongoDB",   image: "mongodb.png" },
        { name: "Firebase",  image: "firebase.png" },
        { name: "PySide2",   image: "pyside2.png" },
        { name: "Tkinter",   image: "tkinter.png" },
        { name: "Godot",     image: "godot.png" },
        { name: "Flutter",   image: "flutter.webp" }
    ];

    // Mapeo de etiquetas → nombre de habilidad
    const tagToSkill = {
        html: "HTML",
        css: "CSS",
        js: "Javascript",
        javascript: "Javascript",
        python: "Python",
        bootstrap: "Bootstrap",
        flask: "Flask",
        mysql: "MySQL",
        mongodb: "MongoDB",
        firebase: "Firebase",
        pyside2: "PySide2",
        tkinter: "Tkinter",
        godot: "Godot",
        flutter: "Flutter"
    };

    // Contar proyectos
    const countBySkill = {};
    skills.forEach(s => countBySkill[s.name] = 0);

    document.querySelectorAll('.proyecto-item').forEach(proyecto => {
        const tags = proyecto.getAttribute('data-tags').toLowerCase().split(/\s+/);
        tags.forEach(tag => {
            const skillName = tagToSkill[tag];
            if (skillName) countBySkill[skillName]++;
        });
    });

    // Renderizar lista
    const container = document.getElementById('skills-container');
    container.className = 'row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3';

    skills.forEach(skill => {
        const count = countBySkill[skill.name] || 0;

        const col = document.createElement('div');
        col.className = 'col';
        col.innerHTML = `
            <div class="card h-100 text-center shadow-sm">
                <div class="card-body d-flex flex-column align-items-center">
                    <img src="static/Habilidades/${skill.image}"
                         alt="${skill.name}"
                         class="mb-2"
                         style="height: 48px; width: 48px; object-fit: contain;"
                         onerror="this.src='static/Habilidades/default.png'">
                    <h6 class="mb-1">${skill.name}</h6>
                    <span class="badge bg-primary">${count} proyecto${count !== 1 ? 's' : ''}</span>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
});