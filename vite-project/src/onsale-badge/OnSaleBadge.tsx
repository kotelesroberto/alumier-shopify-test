const OnSaleBadge = () => {
  const onSalaBadgeElemenet = document.getElementById("onsale-badge");

  subscribe(
    PUB_SUB_EVENTS.variantChange,
    (event: {
      data: { variant: { compare_at_price: number; price: number } };
    }) => {
      ClearBadge(onSalaBadgeElemenet);

      if (
        event.data.variant.compare_at_price &&
        event.data.variant.price < event.data.variant.compare_at_price
      ) {
        AddBadge(onSalaBadgeElemenet);
      }
    }
  );

  return <></>;
};

const ClearBadge = (onSalaBadgeElemenet: HTMLElement | null) => {
  if (onSalaBadgeElemenet) {
    onSalaBadgeElemenet.innerText = "";
  }
};

const AddBadge = (onSalaBadgeElemenet: HTMLElement | null) => {
  if (onSalaBadgeElemenet) {
    const badgeElement = document.createElement("span");
    badgeElement.innerText = "On Sale Now!";
    badgeElement.classList.add("badge", "highlighted");

    onSalaBadgeElemenet?.appendChild(badgeElement);
  }
};

export default OnSaleBadge;
