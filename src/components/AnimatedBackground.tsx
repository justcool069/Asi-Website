"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

function ParticleNetwork({ count = 300 }) {
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    // Handle mouse movement for parallax
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouse({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const [positions, velocities] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = [];
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

            vel.push({
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01,
            });
        }
        return [pos, vel];
    }, [count]);

    const maxDistance = 1.8;

    useFrame((state) => {
        if (!pointsRef.current || !linesRef.current) return;

        // Movement animation
        const posAttr = pointsRef.current.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            posAttr.setX(i, posAttr.getX(i) + velocities[i].x);
            posAttr.setY(i, posAttr.getY(i) + velocities[i].y);
            posAttr.setZ(i, posAttr.getY(i) + velocities[i].z); // slightly wrong dimension for Z but ok for chaos

            // boundaries bounce
            if (Math.abs(posAttr.getX(i)) > 5) velocities[i].x *= -1;
            if (Math.abs(posAttr.getY(i)) > 5) velocities[i].y *= -1;
            if (Math.abs(posAttr.getZ(i)) > 5) velocities[i].z *= -1;
        }
        posAttr.needsUpdate = true;

        // Mouse parallax
        pointsRef.current.rotation.x += (mouse.y * 0.1 - pointsRef.current.rotation.x) * 0.05;
        pointsRef.current.rotation.y += (mouse.x * 0.1 - pointsRef.current.rotation.y) * 0.05;
        linesRef.current.rotation.x = pointsRef.current.rotation.x;
        linesRef.current.rotation.y = pointsRef.current.rotation.y;

        // Draw lines between close particles
        const linePositions = [];
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = posAttr.getX(i) - posAttr.getX(j);
                const dy = posAttr.getY(i) - posAttr.getY(j);
                const dz = posAttr.getZ(i) - posAttr.getZ(j);
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < maxDistance * maxDistance) {
                    linePositions.push(
                        posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i),
                        posAttr.getX(j), posAttr.getY(j), posAttr.getZ(j)
                    );
                }
            }
        }

        linesRef.current.geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(linePositions, 3)
        );
    });

    const { theme } = useTheme();
    // Adjust dot colors and lines based on theme. Dark theme: red base. Light theme: kinda red/grey base.
    const dotColor = theme === "dark" ? "#e10600" : "#ff3b3b";
    const lineColor = theme === "dark" ? "#500600" : "#ffbaba";

    return (
        <group>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial size={0.03} color={dotColor} transparent opacity={0.8} />
            </points>
            <lineSegments ref={linesRef}>
                <bufferGeometry />
                <lineBasicMaterial color={lineColor} transparent opacity={0.3} />
            </lineSegments>
        </group>
    );
}

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <color attach="background" args={["transparent"]} />
                <ParticleNetwork count={150} />
            </Canvas>
        </div>
    );
}
