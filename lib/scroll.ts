import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollToSection(target: string) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: target === "#stays" || target === "#tours" ? -72 : -64,
      duration: 1.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    document
      .querySelector(target)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
