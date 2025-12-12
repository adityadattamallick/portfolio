import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import graphData from "../../data/knowledge.json";
import styles from "./KnowledgeGraph.module.css";

export default function KnowledgeGraph() {
  const svgRef = useRef(null);
  const [selected, setSelected] = useState(null);

  const drawGraph = () => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const { width, height } = svgEl.getBoundingClientRect();

    const svg = d3.select(svgEl).attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    const isMobile = width <= 830;
    const circleRadius = isMobile ? 35 : 45;
    const centerRadius = isMobile ? 60 : 75;
    const linkDistance = isMobile ? 120 : 160;
    const chargeStrength = isMobile ? -300 : -450;

    const simulation = d3
      .forceSimulation(graphData.nodes)
      .force(
        "link",
        d3
          .forceLink(graphData.links)
          .id((d) => d.id)
          .distance(linkDistance)
      )
      .force("charge", d3.forceManyBody().strength(chargeStrength))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graphData.links)
      .enter()
      .append("line")
      .attr("class", styles.link);

    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(graphData.nodes)
      .enter()
      .append("g")
      .call(
        d3
          .drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    node
      .append("circle")
      .attr("r", (d) => (d.isCenter ? centerRadius : circleRadius))
      .attr("class", (d) => (d.isCenter ? styles.centerCircle : styles.circle))
      .on("click", (event, d) => {
        if (d.isCenter) {
          const lines = graphData.nodes
            .filter((n) => !n.isCenter)
            .map((n) => n.label);
          setSelected({ title: "Here are the skills", lines });
        } else {
          setSelected({ title: d.label, lines: d.lines });
        }
      });

    // Helper function to wrap text
    const wrapText = (text, maxChars) => {
      const words = text.split(/\s+/);
      const lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + " " + words[i];

        if (testLine.length <= maxChars) {
          currentLine = testLine;
        } else {
          lines.push(currentLine);
          currentLine = words[i];
        }
      }
      lines.push(currentLine);
      return lines;
    };

    node.each(function (d) {
      const textGroup = d3
        .select(this)
        .append("text")
        .attr("class", styles.label)
        .attr("text-anchor", "middle");

      const radius = d.isCenter ? centerRadius : circleRadius;
      const fontSize = isMobile ? 11 : d.isCenter ? 14 : 12;

      // Calculate max characters based on circle size
      const maxChars = Math.floor(radius / (fontSize * 0.5));
      const lines = wrapText(d.label, maxChars);

      const lineHeight = fontSize + 2;
      const totalHeight = lines.length * lineHeight;
      const startY = -(totalHeight / 2) + lineHeight / 2;

      lines.forEach((line, i) => {
        textGroup
          .append("tspan")
          .attr("x", 0)
          .attr("y", i === 0 ? startY : undefined)
          .attr("dy", i === 0 ? 0 : lineHeight)
          .style("font-size", `${fontSize}px`)
          .text(line);
      });
    });

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => {
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const sourceRadius = d.source.isCenter ? centerRadius : circleRadius;
          return d.source.x + (dx * sourceRadius) / distance;
        })
        .attr("y1", (d) => {
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const sourceRadius = d.source.isCenter ? centerRadius : circleRadius;
          return d.source.y + (dy * sourceRadius) / distance;
        })
        .attr("x2", (d) => {
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const targetRadius = d.target.isCenter ? centerRadius : circleRadius;
          return d.target.x - (dx * targetRadius) / distance;
        })
        .attr("y2", (d) => {
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const targetRadius = d.target.isCenter ? centerRadius : circleRadius;
          return d.target.y - (dy * targetRadius) / distance;
        });

      const clampedX = (x) =>
        Math.max(circleRadius, Math.min(width - circleRadius, x));
      const clampedY = (y) =>
        Math.max(circleRadius, Math.min(height - circleRadius, y));

      node.attr("transform", (d) => {
        d.x = clampedX(d.x);
        d.y = clampedY(d.y);
        return `translate(${d.x},${d.y})`;
      });
    });

    return simulation;
  };

  useEffect(() => {
    let simulation = drawGraph();

    const handleResize = () => {
      if (simulation) {
        simulation.stop();
      }
      simulation = drawGraph();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (simulation) {
        simulation.stop();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setSelected(null);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <section className={styles.container} id="knowledgegraph">
        <h2 className={styles.title}>Skills</h2>
        <svg ref={svgRef} className={styles.svg} />

        {selected && (
          <div className={styles.panel}>
            <button
              className={styles.closeBtn}
              onClick={() => setSelected(null)}
            >
              &times;
            </button>
            <h3>{selected.title}</h3>
            <div className={styles.linesContainer}>
              {selected.lines.map((line, i) => (
                <div key={i} className={styles.line}>
                  • {line}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
