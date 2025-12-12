document.addEventListener('DOMContentLoaded', () => {
    const glassContainer = document.querySelector('.glass-container');

    if (glassContainer) {
        // Creamos el elemento de brillo dinámico
        const shine = document.createElement('div');
        shine.classList.add('shine-effect');
        glassContainer.appendChild(shine);
        
        // Estilo del efecto de brillo
        shine.style.position = 'absolute';
        shine.style.top = '0';
        shine.style.left = '0';
        shine.style.width = '100%';
        shine.style.height = '100%';
        shine.style.borderRadius = '16px';
        shine.style.background = 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, transparent 50%)';
        shine.style.opacity = '0';
        shine.style.pointerEvents = 'none'; // No debe interferir con clics
        shine.style.transition = 'opacity 0.5s ease';

        // Manejar el movimiento del mouse
        glassContainer.addEventListener('mousemove', (e) => {
            // Calcula la posición relativa dentro del contenedor
            const rect = glassContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Mueve el fondo del gradiente para simular el brillo siguiendo el cursor
            shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.25) 0%, transparent 40%)`;
        });

        // Mostrar el brillo al entrar
        glassContainer.addEventListener('mouseenter', () => {
            shine.style.opacity = '1';
        });

        // Ocultar el brillo al salir
        glassContainer.addEventListener('mouseleave', () => {
            shine.style.opacity = '0';
        });
    }
});