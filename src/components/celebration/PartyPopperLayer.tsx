type PartyPopperLayerProps = {
  active: boolean;
};

export function PartyPopperLayer({ active }: PartyPopperLayerProps) {
  if (!active) return null;

  return (
    <div className="party-popper-layer" aria-hidden="true">
      <div className="popper left">
        <span className="popper-smoke" />
        <span className="popper-cone" />
        <span className="popper-ribbon one" />
        <span className="popper-ribbon two" />
      </div>
      <div className="popper right">
        <span className="popper-smoke" />
        <span className="popper-cone" />
        <span className="popper-ribbon one" />
        <span className="popper-ribbon two" />
      </div>
    </div>
  );
}
