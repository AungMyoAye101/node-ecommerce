import { BadRequestError, NotFoundError } from "../common/errors";
import { prisma } from "../lib/prisma"
import { addressType, addressUpdateType } from "../validations/address.schema"

export const createAddressService = async (
    data: addressType
) => {
    const user = await prisma.user.findUnique({
        where: { id: data.userId }
    });
    if (!user) {
        throw new NotFoundError("Invalid user id.");
    }
    return await prisma.address.create(
        { data }
    )
}
export const updateAddressService = async (
    addressId: string,
    data: addressUpdateType
) => {
    const address = await prisma.address.findUnique({
        where: { id: addressId },
        select: {
            id: true,
            userId: true,
        }
    });
    if (!address) {
        throw new NotFoundError("Invalid address id.");
    }
    return await prisma.address.update({
        where: { id: address.id },
        data
    })
}

export const getAddressByUserIdService = async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
        throw new NotFoundError("Invalid user id")
    }
    const address = await prisma.address.findMany({
        where: { userId }
    })
    if (!address) {
        throw new NotFoundError("Address not found.")
    }
    return address;
}
export const deleteAddressService = async (
    addressId: string,
) => {
    const address = await prisma.address.findUnique({
        where: { id: addressId },
        select: {
            id: true,
            userId: true,
        }
    });
    if (!address) {
        throw new NotFoundError("Invalid address id.");
    }
    return await prisma.address.delete({
        where: { id: address.id },
    })
}