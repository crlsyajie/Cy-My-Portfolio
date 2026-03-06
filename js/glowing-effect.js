// glowing-effect.js

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".glowing-effect-container");

  if (containers.length === 0) return;

  const inactiveZone = 0.01;
  const proximity = 64;
  const movementDuration = 2000; // not fully used in requestAnimationFrame as we're doing manual lerp

  let lastPosition = { x: 0, y: 0 };
  let animationFrameId = null;

  // We'll store the current angle for each container to allow smooth transitions
  containers.forEach(container => {
    container.currentAngle = 0;
  });

  const handleMove = (e) => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = requestAnimationFrame(() => {
      const mouseX = e?.clientX ?? lastPosition.x;
      const mouseY = e?.clientY ?? lastPosition.y;

      if (e && e.clientX !== undefined) {
        lastPosition = { x: mouseX, y: mouseY };
      }

      containers.forEach(container => {
        const rect = container.getBoundingClientRect();
        const left = rect.left;
        const top = rect.top;
        const width = rect.width;
        const height = rect.height;

        const center = [left + width * 0.5, top + height * 0.5];
        const distanceFromCenter = Math.hypot(
          mouseX - center[0],
          mouseY - center[1]
        );
        const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

        if (distanceFromCenter < inactiveRadius) {
          container.style.setProperty("--active", "0");
          return;
        }

        const isActive =
          mouseX > left - proximity &&
          mouseX < left + width + proximity &&
          mouseY > top - proximity &&
          mouseY < top + height + proximity;

        container.style.setProperty("--active", isActive ? "1" : "0");

        if (!isActive) return;

        let targetAngle =
          (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
            Math.PI +
          90;

        // Simplify rotation interpolation
        const currentAngle = parseFloat(container.style.getPropertyValue("--start")) || 0;
        const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
        const newAngle = currentAngle + angleDiff;

        // Apply immediately or use a simple lerp if we want smooth animation
        // We'll apply it directly for performance, as the React version uses framer-motion which handles lerping internally
        container.style.setProperty("--start", String(newAngle));
      });
    });
  };

  const handleScroll = () => handleMove();
  const handlePointerMove = (e) => handleMove(e);

  window.addEventListener("scroll", handleScroll, { passive: true });
  document.body.addEventListener("pointermove", handlePointerMove, {
    passive: true,
  });
});
