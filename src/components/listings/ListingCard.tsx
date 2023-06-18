"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import useCountries from "@/hooks/useCountries";
//Types
import { SafeUser } from "@/types";
import { Listing, Reservation } from "@prisma/client";
//Components
import Button from "../Button";
import HeartButton from "../HeartButton";

export interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser;
}

const ListingCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}: ListingCardProps) => {
  // Hooks
  const router = useRouter();
  const { getByValue } = useCountries();

  // Date
  const location = getByValue(data.locationValue);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  //   Actions

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return null;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  return (
    <article
      onClick={() => router.push(`/listings/${data.id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex flex-col gap-2 w-full">
        <figure className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            src={data.imageSrc}
            fill
            alt={"Listing"}
            className=" object-cover w-full h-full group-hover:scale-110 transition"
          />
          <div className={`absolute top-3 right-3`}>
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </figure>
        <div className="font-semibold text-lg">
          {" "}
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          $ {price}
          {!reservation && <div className="font-light">/night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
            btnType="button"
          />
        )}
      </div>
    </article>
  );
};

export default ListingCard;
