import { useEffect } from "react";
import { useCelebration } from "../../context/CelebrationContext";
import { BirthdayCake } from "./BirthdayCake";
import { BirthdayReveal } from "./BirthdayReveal";
import { CelebrationCountdown } from "./CelebrationCountdown";
import { CelebrationIntro } from "./CelebrationIntro";
import { ConfettiCanvas } from "./ConfettiCanvas";
import { LuxuryCurtains } from "./LuxuryCurtains";
import { MusicPermissionSheet } from "./MusicPermissionSheet";
import { PartyPopperLayer } from "./PartyPopperLayer";
import { RosePetalLayer } from "./RosePetalLayer";

export function CelebrationExperience() {
  const celebration = useCelebration();
  const overlayActive = celebration.stage !== "completed";
  const petalsActive = !celebration.reducedMotion && (celebration.petalsActive || celebration.stage === "intro" || celebration.stage === "birthdayReveal");

  useEffect(() => {
    if (!overlayActive) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [overlayActive]);

  const renderStage = () => {
    switch (celebration.stage) {
      case "intro":
        return <CelebrationIntro />;
      case "permission":
        return (
          <>
            <CelebrationIntro passive />
            <MusicPermissionSheet />
          </>
        );
      case "countdown":
        return <CelebrationCountdown />;
      case "curtain":
        return (
          <section className="curtain-stage">
            <LuxuryCurtains open={celebration.curtainsOpen} />
            <p>Let the birthday magic begin...</p>
          </section>
        );
      case "popper":
        return (
          <section className="curtain-stage popper-stage">
            <LuxuryCurtains open />
            <div className="popper-stage-copy">
              <span>✦</span>
              <p>Happy Birthday Tanpreet!</p>
            </div>
          </section>
        );
      case "cake":
        return <BirthdayCake />;
      case "birthdayReveal":
        return <BirthdayReveal />;
      case "completed":
        return null;
    }
  };

  return (
    <>
      <ConfettiCanvas burst={celebration.burst} reducedMotion={celebration.reducedMotion} />
      <RosePetalLayer active={petalsActive} />
      <PartyPopperLayer active={celebration.poppersActive} />
      {celebration.toast ? <div className="celebration-toast">{celebration.toast}</div> : null}
      {overlayActive ? <div className={`celebration-layer stage-${celebration.stage}`}>{renderStage()}</div> : null}
    </>
  );
}
