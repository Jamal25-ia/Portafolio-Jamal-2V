    // Definimos las habilidades en un array de objetos
    const skills = [
        {"name": "HTML", "image": "html.webp", "level": "Intermedio"},
        {"name": "Javascript", "image": "Javascript.png", "level": "Intermedio"},
        {"name": "CSS", "image": "css.png", "level": "Principiante"},
        {"name": "Python", "image": "python.webp", "level": "Avanzado"},
        {"name": "Bootstrap", "image": "bootstrap.png", "level": "Intermedio"},
        {"name": "MySQL", "image": "mysql.png", "level": "Intermedio"},
        {"name": "MongoDB", "image": "mongodb.png", "level": "Intermedio"},
        {"name": "Firebase", "image": "firebase.png", "level": "Principiante"},
        {"name": "Flask", "image": "flask.png", "level": "Avanzado"},
        {"name": "PySide2", "image": "pyside2.png", "level": "Avanzado"},
        {"name": "Tkinter", "image": "tkinter.png", "level": "Principiante"},
        {"name": "Godot", "image": "godot.png", "level": "Avanzado"},
        {"name": "Flutter", "image": "flutter.webp", "level": "Intermedio"}
    ];

    // Función para determinar la clase de color según el nivel
    function getLevelClass(level) {
        switch(level) {
            case 'Principiante': return 'text-danger';
            case 'Intermedio': return 'text-warning';
            case 'Avanzado': return 'text-success';
            default: return 'text-secondary';
        }
    }

    // Generamos las tarjetas
    const skillsContainer = document.getElementById('skills-container');
    
    skills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'col-12 col-sm-6 col-lg-4 col-xl-3'; // Grid responsivo mejorado
        card.innerHTML = `
            <div class="card mb-3 habilidad-item">
                <div class="row g-0 tech-box rounded-3 badge bg-dark">
                    <div class="col-md-4 text-center">
                        <h5 class="card-title">${skill.name}</h5>
                        <div class="mx-auto mt-3">
                            <img loading="lazy" 
                                 src="static/Habilidades/${skill.image}" 
                                 alt="${skill.name}" 
                                 class="img-fluid">
                        </div>
                    </div>
                    <div>
                        <div class="card-body d-flex flex-column justify-content-center">
                            <p class="card-text">Nivel: 
                                <span class="${getLevelClass(skill.level)}">${skill.level}</span>
                            </p>
                            <p class="card-text">Cantidad de proyectos:  
                                <span id="Actualizar" class="text-info"></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        skillsContainer.appendChild(card);
    });

    document.addEventListener('DOMContentLoaded', () => {
        // Obtener todos los elementos que contienen proyectos
        const proyectos = document.querySelectorAll('.proyecto-item');
        const habilidades = document.querySelectorAll('.habilidad-item');

        // Crear un objeto para almacenar el conteo de etiquetas
        const conteoEtiquetas = {};

        // Recorrer cada proyecto y sus etiquetas
        proyectos.forEach(proyecto => {
            const etiquetas = proyecto.getAttribute('data-tags').split(' ');
            etiquetas.forEach(etiqueta => {
                const etiquetaNormalizada = etiqueta.trim().toLowerCase();
                if (conteoEtiquetas[etiquetaNormalizada]) {
                    conteoEtiquetas[etiquetaNormalizada]++;
                } else {
                    conteoEtiquetas[etiquetaNormalizada] = 1;
                }
            });
        });

        // Mostrar el conteo de etiquetas en la consola
        console.log("Conteo de Etiquetas:", conteoEtiquetas);

        // Actualizar la cantidad de proyectos en las habilidades
        habilidades.forEach(habilidad => {
            let skillName = habilidad.querySelector('.card-title').innerText.trim().toLowerCase();
            console.log(`Procesando habilidad: ${skillName}`);

            // Convertir "javascript" a "js"
            if (skillName === "javascript") {
                skillName = "js";
            }

            console.log(`Etiquetas disponibles: ${Object.keys(conteoEtiquetas)}`);
            if (conteoEtiquetas[skillName]) {
                const cantidadProyectosElem = habilidad.querySelector('#Actualizar');
                if (cantidadProyectosElem) {
                    // Asignar la cantidad de proyectos
                    console.log(`Actualizando ${skillName} con ${conteoEtiquetas[skillName]} proyectos`);
                    cantidadProyectosElem.innerText = conteoEtiquetas[skillName];
                } else {
                    console.warn(`Elemento para actualizar la cantidad de proyectos no encontrado en: ${skillName}`);
                }
            } else {
                console.warn(`No se encontraron proyectos para la habilidad: ${skillName}`);
            }
        });
    });