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
      .append("g");

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

    node.each(function (d) {
      const text = d3
        .select(this)
        .append("text")
        .attr("class", styles.label)
        .attr("text-anchor", "middle");

      if (d.isCenter) {
        text.attr("dy", 5).text(d.label);
      } else {
        const words = d.label.split(" ");
        if (words.length > 1 && d.label.length > 8 && !isMobile) {
          words.forEach((word, i) => {
            text
              .append("tspan")
              .attr("x", 0)
              .attr("dy", i === 0 ? -6 : 14)
              .text(word);
          });
        } else {
          text.attr("dy", 5).text(d.label);
        }
      }
    });

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

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
      <section className={styles.container}>
        <h2 className={styles.title}>Skills</h2>
        <svg ref={svgRef} className={styles.svg} />

        {}
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
