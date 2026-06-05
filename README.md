# ⚡ Coulomb's Law Calculator

> An interactive 3D electrostatic force calculator built with **React**, **Vite**, and **Tailwind CSS**.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)

---

## 📐 What It Does

Given two point charges **q₁** and **q₂** placed anywhere in 3D space, this calculator computes:

| Output | Description |
|--------|-------------|
| **Distance r** | Separation between the two charges (m) |
| **Displacement vector** | r⃗ from q₁ to q₂ with components (x, y, z) |
| **Unit vector r̂** | Normalised direction vector |
| **Force on q₁** | Vector force on q₁ due to q₂ (N) |
| **Force on q₂** | Equal & opposite reaction force (N) |
| **\|F\| magnitude** | Scalar magnitude of the Coulomb force (N) |
| **Interaction type** | Attractive (opposite signs) or Repulsive (same signs) |
| **Potential energy U** | Electric potential energy of the system (J) |

---

## 🧮 Physics

**Coulomb's Law** (vector form):

```
F⃗ = k · q₁ · q₂ / r² · r̂
```

**Electric Potential Energy:**

```
U = k · q₁ · q₂ / r
```

Where:
- `k` = 8.9875517923 × 10⁹ N·m²/C² (Coulomb constant)
- `r` = distance between the two charges
- `r̂` = unit vector pointing from q₁ to q₂

> The Coulomb constant `k` is configurable — useful for non-SI unit systems or custom media with a different permittivity.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+

### Install & Run

```bash
git clone https://github.com/amirulasraf89/Coulomb_calculator.git
cd Coulomb_calculator
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 🏗️ Project Structure

```
src/
├── App.tsx                  # Main app layout & state
├── main.tsx                 # React entry point
├── index.css                # Global styles (Tailwind)
├── components/
│   ├── ChargeCard.tsx       # Input card for each charge (q, x, y, z)
│   └── ResultPanel.tsx      # Computed results display
└── utils/
    └── coulomb.ts           # Core physics calculations
```

---

## 🔧 Tech Stack

| Tool | Purpose |
|------|---------|
| **React 19** | UI framework |
| **TypeScript** | Type-safe calculations |
| **Tailwind CSS v4** | Utility-first styling |
| **Vite 8** | Fast dev server & bundler |

---

## 💡 Example

**Input:**
- q₁ = +1 μC at (0, 0, 0)
- q₂ = −2 μC at (0.5, 0, 0)

**Output:**
- r = 0.5 m
- |F| = 0.071900 N
- Interaction: **Attractive** (opposite charges)
- U = −0.035950 J

---

## 📝 License

This project is for personal / educational use.

---

<div align="center">
  <p>Built with ❤️ by <strong>Amirul Asraf</strong></p>
  <p>
    <a href="https://github.com/amirulasraf89">GitHub</a> •
    <a href="https://merakistore.app">MerakiStore</a>
  </p>
</div>
