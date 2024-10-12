import { BotIcon, SettingsIcon, HeartPulseIcon, LayoutGridIcon, NotepadTextIcon, StethoscopeIcon, DatabaseIcon, MessageSquareIcon, FileIcon, FlaskConicalIcon, BrainIcon } from "lucide-react";
export const LINKS = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutGridIcon,
    },
    {
        label: "Health Status",
        href: "/dashboard/health-status",
        icon: HeartPulseIcon,
    },
    {
        label: "Health Tips",
        href: "/dashboard/health-tips",
        icon: NotepadTextIcon,
    },
    {
        label: "Summary",
        href: "/dashboard/summary",
        icon: StethoscopeIcon,
    },
    {
        label: "ai",
        href: "/dashboard/ai",
        icon: BotIcon,
    },

    {
        label: "recomendatiopns",
        href: "/dashboard/rec",
        icon: BrainIcon,
    },
   

    {
        label: "Molecule Bank",
        href: "/dashboard/molecule-bank",
        icon: FlaskConicalIcon,  // Changed to MoleculeIcon
    },
    {
        label: "Research",
        href: "/dashboard/research",
        icon: DatabaseIcon,  // Changed to DatabaseIcon
    },
    {
        label: "Models",
        href: "/dashboard/model",
        icon: FileIcon,  // Changed to FileIcon
    },
    {
        label: "Message",
        href: "/dashboard/message",
        icon: MessageSquareIcon,  // Changed to MessageSquareIcon
    },
    {
        label: "Settings",
        href: "/dashboard/account/settings",
        icon: SettingsIcon,
    }
] as const;
