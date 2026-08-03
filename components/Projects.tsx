"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/RevealWrapper";
import { PROJECTS } from "@/lib/data";

type ConferenceItem = {
  code: string;
  title: string;
  desc: string;
  stack: string[];
  href: string;
};

type ProjectEntry = {
  featured: boolean;
  num: string;
  icon: string;
  title: string;
  mobileTitle?: string;
  desc: string;
  stack: string[];
  href: string;
  modalTitle?: string;
  modalIntro?: string;
  modalItems?: ConferenceItem[];
};

function isConferenceProject(project: ProjectEntry) {
  return Boolean(project.modalItems?.length);
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectEntry | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const projects = PROJECTS as ProjectEntry[];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");

    const syncMobile = () => setIsMobile(mediaQuery.matches);
    syncMobile();

    mediaQuery.addEventListener("change", syncMobile);
    return () => mediaQuery.removeEventListener("change", syncMobile);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };

    if (activeProject) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeProject]);

  return (
    <>
      <section id="projects" style={{ padding: "120px 5vw", background: "var(--bg)" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 64,
          }}
        >
          <div>
            <div className="section-label">04 - Projects</div>
            <div
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-.03em",
              }}
            >
              Selected
              <br />
              <em
                style={{
                  fontFamily: "var(--font-instrument)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--muted)",
                }}
              >
                work.
              </em>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveProject(projects[0] ?? null)}
            className="view-all"
            style={{
              fontSize: 11,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "color .2s",
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            View details
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M7 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 1,
            background: "var(--border)",
          }}
        >
          {projects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={index * 70}
              style={{ gridColumn: project.featured ? "span 2" : undefined }}
            >
              <ProjectCard
                project={project}
                isMobile={isMobile}
                onOpen={() => setActiveProject(project)}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {activeProject ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeProject.modalTitle || activeProject.title}
          onClick={() => setActiveProject(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(12,12,12,.78)",
            backdropFilter: "blur(14px)",
            display: "grid",
            placeItems: "center",
            padding: "24px",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "min(980px, 100%)",
              maxHeight: "88vh",
              overflowY: "auto",
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              boxShadow: "0 30px 80px rgba(0,0,0,.45)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 20,
                padding: "28px 28px 20px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div>
                <div className="section-label" style={{ marginBottom: 12 }}>
                  Project details
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "clamp(28px, 4vw, 44px)",
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: "-.03em",
                    marginBottom: 12,
                  }}
                >
                  {activeProject.modalTitle || activeProject.title}
                </div>
                <p
                  style={{
                    maxWidth: 720,
                    color: "var(--muted)",
                    fontSize: 13,
                    lineHeight: 1.9,
                  }}
                >
                  {activeProject.modalIntro}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close dialog"
                style={{
                  background: "transparent",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  padding: "10px 14px",
                  cursor: "pointer",
                  fontSize: 11,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                }}
              >
                Close
              </button>
            </div>

            <div style={{ padding: 28, display: "grid", gap: 16 }}>
              {isConferenceProject(activeProject) ? (
                activeProject.modalItems!.map((item) => (
                  <a
                    key={item.code}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal-item"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr auto",
                      gap: 20,
                      alignItems: "center",
                      padding: "20px",
                      border: "1px solid var(--border)",
                      background: "rgba(17,17,17,.74)",
                      transition: "transform .2s, border-color .2s, background .2s",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        border: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-syne)",
                        fontSize: 15,
                        fontWeight: 800,
                        color: "var(--gold)",
                        background: "rgba(201,168,76,.06)",
                      }}
                    >
                      {item.code}
                    </div>

                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-syne)",
                          fontSize: 16,
                          fontWeight: 700,
                          marginBottom: 8,
                        }}
                      >
                        {item.title}
                      </div>
                      <p
                        style={{
                          fontSize: 12,
                          color: "var(--muted)",
                          lineHeight: 1.8,
                          marginBottom: 14,
                        }}
                      >
                        {item.desc}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {item.stack.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: 10,
                              letterSpacing: ".08em",
                              padding: "4px 10px",
                              border: "1px solid var(--border)",
                              color: "var(--muted)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 10,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                      }}
                    >
                      Open
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2 7h10M7 2l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </a>
                ))
              ) : (
                <div
                  className="project-single-modal"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    gap: 20,
                    alignItems: "center",
                    padding: "20px",
                    border: "1px solid var(--border)",
                    background: "rgba(17,17,17,.74)",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-syne)",
                      fontSize: 18,
                      fontWeight: 800,
                      color: "var(--gold)",
                      background: "rgba(201,168,76,.06)",
                    }}
                  >
                    {activeProject.icon}
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        letterSpacing: ".15em",
                        color: "var(--muted)",
                        marginBottom: 8,
                      }}
                    >
                      {activeProject.num}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-syne)",
                        fontSize: 22,
                        fontWeight: 700,
                        marginBottom: 10,
                      }}
                    >
                      {activeProject.title}
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--muted)",
                        lineHeight: 1.9,
                        marginBottom: 14,
                      }}
                    >
                      {activeProject.desc}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {activeProject.stack.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 10,
                            letterSpacing: ".08em",
                            padding: "4px 10px",
                            border: "1px solid var(--border)",
                            color: "var(--muted)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                <a
                  href={activeProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-single-modal-link"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                      fontSize: 10,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                    }}
                  >
                    Open
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7h10M7 2l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ProjectCard({
  project,
  isMobile,
  onOpen,
}: {
  project: ProjectEntry;
  isMobile: boolean;
  onOpen?: () => void;
}) {
  const isGroup = Boolean(project.modalItems?.length);
  const displayTitle = isMobile && project.mobileTitle ? project.mobileTitle : project.title;
  const canOpenModal = isMobile || isGroup;

  return (
    <article
      className="proj-card"
      role={canOpenModal ? "button" : undefined}
      tabIndex={canOpenModal ? 0 : undefined}
      aria-label={canOpenModal ? `Open ${project.title} details` : undefined}
      onClick={canOpenModal ? onOpen : undefined}
      onKeyDown={
        canOpenModal
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onOpen?.();
              }
            }
          : undefined
      }
      style={{
        background: "var(--bg2)",
        border: "1px solid var(--border)",
        overflow: "hidden",
        position: "relative",
        minHeight: 260,
        height: "100%",
        transition: "transform .25s, border-color .25s, background .25s",
        cursor: canOpenModal ? "pointer" : "default",
      }}
    >
      <div
        className="proj-card-inner"
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-between",
          gap: 24,
          padding: 28,
          minHeight: 260,
          height: "100%",
        }}
      >
        <div
          style={{
            width: 68,
            minWidth: 68,
            height: 68,
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-syne)",
            fontSize: 24,
            fontWeight: 800,
            color: "var(--gold)",
            background: "rgba(201,168,76,.06)",
          }}
        >
          {project.icon}
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: ".15em",
              color: "var(--muted)",
              marginBottom: 10,
            }}
          >
            {project.num}
          </div>
          <div
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-.02em",
              marginBottom: 10,
            }}
          >
            {displayTitle}
          </div>
          <p
            className="project-card-desc"
            style={{
              fontSize: 13,
              color: "var(--muted)",
              lineHeight: 1.9,
              maxWidth: 720,
              marginBottom: 18,
            }}
          >
            {project.desc}
          </p>

          <div className="project-card-stack" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {project.stack.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 10,
                  letterSpacing: ".08em",
                  padding: "4px 10px",
                  border: "1px solid var(--border)",
                  color: "var(--muted)",
                  background: "var(--surface)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: ".15em",
              textTransform: "uppercase",
              color: "var(--gold)",
              textAlign: "right",
            }}
          >
            {isGroup ? "3 highlights" : "Live site"}
          </span>
          {isMobile ? (
            <span
              style={{
                fontSize: 10,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "var(--gold)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Tap for details
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7h10M7 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          ) : isGroup ? (
            <button
              type="button"
              onClick={onOpen}
              style={{
                background: "transparent",
                border: "1px solid var(--border)",
                color: "var(--text)",
                padding: "10px 14px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 10,
                letterSpacing: ".12em",
                textTransform: "uppercase",
              }}
            >
              Open
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7h10M7 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 10,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "var(--gold)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Visit
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7h10M7 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
