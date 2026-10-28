import { ImageResponse } from "next/og";

/** Imagen para redes (Open Graph / Twitter) generada en build con la estética del sitio. */
export const alt = "CloudBit: DevOps, Cloud AWS/Azure y Kubernetes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "72px 80px",
                    background:
                        "radial-gradient(80% 70% at 50% 110%, rgba(9,93,189,0.75) 0%, rgba(8,14,27,0) 70%), #080e1b",
                    color: "#ffffff",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 999, background: "#42a2fe" }} />
                    <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>CloudBit</div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
                        DevOps, Cloud y Kubernetes para empresas que necesitan escalar
                    </div>
                    <div style={{ fontSize: 30, color: "#9ea3bf" }}>
                        Migración · CI/CD · DevSecOps · Operación 24/7
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9ea3bf" }}>
                    <span>cloudbit.com.ar</span>
                    <span>AWS · Azure · Kubernetes · Terraform</span>
                </div>
            </div>
        ),
        size
    );
}
