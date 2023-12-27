"use client";

import {
    Dialog,
    Button,
    TextField,
    AlertDialog,
    Flex,
    Text,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DeleteDialog({
    id,
    isOpen,
}: {
    id: string | number;
    isOpen?: boolean;
}) {
    // if (isOpen) {
    //     return null;
    // }
    const router = useRouter();

    return (
        //         <Dialog.Root>
        //             <Dialog.Trigger>
        //                 <a className="block  px-4 text-sm text-red-600 hover:bg-gray-100 ">
        //                     Delete
        //                 </a>
        //             </Dialog.Trigger>

        //             <Dialog.Content style={{ maxWidth: 450 }}>
        //                 <Dialog.Title>Ты что, собрался удалить эту хрень?</Dialog.Title>
        //                 <Flex gap="3" mt="4">
        //                     <Dialog.Close>
        //                         <Button variant="soft" color="gray">
        //                             Cancel
        //                         </Button>
        //                     </Dialog.Close>
        //                     <Dialog.Close>
        //                         <Button
        //                             onMouseUp={async (e) => {
        //                                 e.preventDefault();

        //                                 try {
        //                                     await fetch(`/api/bottles/${id}`, {
        //                                         method: "DELETE",
        //                                     });

        //                                     router.push("/");
        //                                 } catch {
        //                                     console.error("error");
        //                                 }
        //                             }}
        //                         >
        //                             Delete
        //                         </Button>
        //                     </Dialog.Close>
        //                 </Flex>
        //             </Dialog.Content>
        //         </Dialog.Root>

        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <a className="block text-sm text-red-600 hover:bg-gray-100 ">
                    Delete
                </a>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: 450 }}>
                <AlertDialog.Title>
                    Ты что, собрался удалить эту хрень?
                </AlertDialog.Title>

                <Flex gap="3" mt="4">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button
                            variant="solid"
                            color="red"
                            onMouseUp={async (e) => {
                                e.preventDefault();

                                try {
                                    await fetch(`/api/bottles/${id}`, {
                                        method: "DELETE",
                                    });

                                    toast.success(
                                        "Ты только что удалил бутылку бормотухи. Ну что ты за криворукий? Фотка осталась, кстати("
                                    );

                                    router.refresh();
                                } catch {
                                    toast.error("Ниче не удалилось");
                                }
                            }}
                        >
                            Delete
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}
