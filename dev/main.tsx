import { useState } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles/playground.css";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  DatePicker,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownSeparator,
  Input,
  Modal,
  OTPInput,
  Popover,
  Progress,
  ProgressCircular,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ThemeProvider,
  ToastProvider,
  Toggle,
  Tooltip,
  TooltipProvider,
  useTheme,
  useToast,
} from "../src";

/* ─── Palette definitions ─── */

import type { BloomPalette } from "../src";

interface PaletteConfig extends BloomPalette {
  label: string;
  light: Record<string, string>;
  dark: Record<string, string>;
}

const palettes: Record<string, PaletteConfig> = {
  bloom: {
    name: "bloom",
    label: "Bloom (Default)",
    light: {},
    dark: {},
  },
  midnight: {
    name: "midnight",
    label: "Midnight Garden",
    light: {
      "--bloom-font": "'Cormorant Garamond', serif",
      "--bloom-font-display": "'Playfair Display', serif",
      "--bloom-bg": "#F5F3F8",
      "--bloom-surface": "#EAE6F0",
      "--bloom-surface2": "#DBD5E4",
      "--bloom-text": "#1E1A28",
      "--bloom-text-secondary": "#6B6580",
      "--bloom-accent1": "#5E8C6A",
      "--bloom-accent1-deep": "#3D6B4A",
      "--bloom-accent2": "#6A7EC8",
      "--bloom-accent2-deep": "#4A5EA8",
      "--bloom-accent3": "#8B6AAE",
      "--bloom-accent3-deep": "#6A4A8E",
      "--bloom-accent4": "#C86A7E",
      "--bloom-accent4-deep": "#A84A5E",
      "--bloom-shadow": "0 2px 24px rgba(30,26,40,0.08)",
      "--bloom-shadow-hover": "0 8px 40px rgba(30,26,40,0.14)",
      "--bloom-radius-sm": "8px",
      "--bloom-radius": "12px",
      "--bloom-radius-lg": "16px",
      "--bloom-radius-pill": "999px",
    },
    dark: {
      "--bloom-font": "'Cormorant Garamond', serif",
      "--bloom-font-display": "'Playfair Display', serif",
      "--bloom-bg": "#0F1117",
      "--bloom-surface": "#1A1D27",
      "--bloom-surface2": "#252A36",
      "--bloom-text": "#E2E0EC",
      "--bloom-text-secondary": "#8B87A0",
      "--bloom-accent1": "#5E8C6A",
      "--bloom-accent1-deep": "#3D6B4A",
      "--bloom-accent2": "#6A7EC8",
      "--bloom-accent2-deep": "#4A5EA8",
      "--bloom-accent3": "#8B6AAE",
      "--bloom-accent3-deep": "#6A4A8E",
      "--bloom-accent4": "#C86A7E",
      "--bloom-accent4-deep": "#A84A5E",
      "--bloom-shadow": "0 2px 24px rgba(0,0,0,0.3)",
      "--bloom-shadow-hover": "0 8px 40px rgba(0,0,0,0.4)",
      "--bloom-radius-sm": "8px",
      "--bloom-radius": "12px",
      "--bloom-radius-lg": "16px",
      "--bloom-radius-pill": "999px",
    },
  },
  desert: {
    name: "desert",
    label: "Desert Rose",
    light: {
      "--bloom-font": "'Karla', sans-serif",
      "--bloom-font-display": "'Lora', serif",
      "--bloom-bg": "#FBF5EE",
      "--bloom-surface": "#F2E8DA",
      "--bloom-surface2": "#E6D8C4",
      "--bloom-text": "#3D2E1E",
      "--bloom-text-secondary": "#8C7A66",
      "--bloom-accent1": "#B8A080",
      "--bloom-accent1-deep": "#96795A",
      "--bloom-accent2": "#D4956A",
      "--bloom-accent2-deep": "#B87040",
      "--bloom-accent3": "#C4887C",
      "--bloom-accent3-deep": "#A8685C",
      "--bloom-accent4": "#CC6B5E",
      "--bloom-accent4-deep": "#A84A3E",
      "--bloom-shadow": "0 2px 24px rgba(61,46,30,0.08)",
      "--bloom-shadow-hover": "0 8px 40px rgba(61,46,30,0.14)",
      "--bloom-radius-sm": "16px",
      "--bloom-radius": "20px",
      "--bloom-radius-lg": "28px",
      "--bloom-radius-pill": "999px",
    },
    dark: {
      "--bloom-font": "'Karla', sans-serif",
      "--bloom-font-display": "'Lora', serif",
      "--bloom-bg": "#1C1610",
      "--bloom-surface": "#28201A",
      "--bloom-surface2": "#362C22",
      "--bloom-text": "#E8DED0",
      "--bloom-text-secondary": "#9A8A76",
      "--bloom-accent1": "#A08868",
      "--bloom-accent1-deep": "#7E6848",
      "--bloom-accent2": "#C48050",
      "--bloom-accent2-deep": "#A06030",
      "--bloom-accent3": "#B07868",
      "--bloom-accent3-deep": "#905848",
      "--bloom-accent4": "#B85848",
      "--bloom-accent4-deep": "#983828",
      "--bloom-shadow": "0 2px 24px rgba(0,0,0,0.3)",
      "--bloom-shadow-hover": "0 8px 40px rgba(0,0,0,0.4)",
      "--bloom-radius-sm": "16px",
      "--bloom-radius": "20px",
      "--bloom-radius-lg": "28px",
      "--bloom-radius-pill": "999px",
    },
  },
  ocean: {
    name: "ocean",
    label: "Ocean Mist",
    light: {
      "--bloom-font": "'Nunito', sans-serif",
      "--bloom-font-display": "'Space Grotesk', sans-serif",
      "--bloom-bg": "#F4F8FA",
      "--bloom-surface": "#E8F0F4",
      "--bloom-surface2": "#D4E2EA",
      "--bloom-text": "#1A2E3A",
      "--bloom-text-secondary": "#5E7A8C",
      "--bloom-accent1": "#6AB8C4",
      "--bloom-accent1-deep": "#3A96A8",
      "--bloom-accent2": "#E0A860",
      "--bloom-accent2-deep": "#C08840",
      "--bloom-accent3": "#7CA0D4",
      "--bloom-accent3-deep": "#5A80B8",
      "--bloom-accent4": "#D47A7A",
      "--bloom-accent4-deep": "#B85A5A",
      "--bloom-shadow": "0 2px 24px rgba(26,46,58,0.06)",
      "--bloom-shadow-hover": "0 8px 40px rgba(26,46,58,0.1)",
      "--bloom-radius-sm": "6px",
      "--bloom-radius": "10px",
      "--bloom-radius-lg": "14px",
      "--bloom-radius-pill": "999px",
    },
    dark: {
      "--bloom-font": "'Nunito', sans-serif",
      "--bloom-font-display": "'Space Grotesk', sans-serif",
      "--bloom-bg": "#0E1A20",
      "--bloom-surface": "#162228",
      "--bloom-surface2": "#1E2E36",
      "--bloom-text": "#D8E8EE",
      "--bloom-text-secondary": "#7A9AAC",
      "--bloom-accent1": "#4A9AAC",
      "--bloom-accent1-deep": "#2A7A8C",
      "--bloom-accent2": "#C89048",
      "--bloom-accent2-deep": "#A87030",
      "--bloom-accent3": "#5A80B8",
      "--bloom-accent3-deep": "#3A60A0",
      "--bloom-accent4": "#B85A5A",
      "--bloom-accent4-deep": "#983A3A",
      "--bloom-shadow": "0 2px 24px rgba(0,0,0,0.3)",
      "--bloom-shadow-hover": "0 8px 40px rgba(0,0,0,0.4)",
      "--bloom-radius-sm": "6px",
      "--bloom-radius": "10px",
      "--bloom-radius-lg": "14px",
      "--bloom-radius-pill": "999px",
    },
  },
};

type PaletteKey = keyof typeof palettes;

/* ─── Toast demo ─── */

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-[var(--space-sm)]">
      <Button variant="success" onClick={() => toast({ title: "Saved successfully", variant: "success" })}>
        Success
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast({ title: "Something went wrong", description: "Please try again later", variant: "error" })
        }
      >
        Error
      </Button>
      <Button
        variant="warning"
        onClick={() => toast({ title: "Careful", description: "This action cannot be undone", variant: "warning" })}
      >
        Warning
      </Button>
      <Button variant="accent" onClick={() => toast({ title: "New update available", variant: "info" })}>
        Info
      </Button>
    </div>
  );
}

/* ─── App ─── */

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [progress, setProgress] = useState(60);
  const [otp, setOtp] = useState("");
  const { resolvedMode, toggleColorMode, palette, setPalette } = useTheme();
  const label = palettes[palette as PaletteKey]?.label ?? palette;

  return (
    <TooltipProvider delayDuration={200}>
      <ToastProvider>
        <div className="min-h-screen p-[var(--space-3xl)]">
          <div className="max-w-[800px] mx-auto flex flex-col gap-[var(--space-3xl)]">
            {/* Logo Preview */}
            <section className="flex flex-col items-center gap-[var(--space-lg)]">
              <img src="./logo.png" alt="Bloom logo" width={512} height={512} />
            </section>

            {/* Header + Theme Switcher */}
            <header className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-[var(--space-md)]">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 512 512"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-labelledby="bloom-logo-title"
                  >
                    <title id="bloom-logo-title">Bloom logo</title>
                    <defs>
                      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7EC8A0" />
                        <stop offset="100%" stopColor="#4A9E6E" />
                      </linearGradient>
                      <linearGradient id="g2" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#A8D8B9" />
                        <stop offset="100%" stopColor="#6BBF8A" />
                      </linearGradient>
                    </defs>
                    <ellipse
                      cx="210"
                      cy="310"
                      rx="90"
                      ry="140"
                      transform="rotate(45 210 310)"
                      fill="url(#g1)"
                      opacity="0.7"
                    />
                    <ellipse
                      cx="302"
                      cy="310"
                      rx="90"
                      ry="140"
                      transform="rotate(-45 302 310)"
                      fill="url(#g1)"
                      opacity="0.7"
                    />
                    <ellipse
                      cx="210"
                      cy="230"
                      rx="90"
                      ry="140"
                      transform="rotate(-45 210 230)"
                      fill="url(#g2)"
                      opacity="0.8"
                    />
                    <ellipse
                      cx="302"
                      cy="230"
                      rx="90"
                      ry="140"
                      transform="rotate(45 302 230)"
                      fill="url(#g2)"
                      opacity="0.8"
                    />
                    <circle cx="256" cy="270" r="24" fill="#3D6B4A" opacity="0.9" />
                  </svg>
                  <h1 className="font-[family-name:var(--bloom-font-display)] text-[var(--bloom-text-display-xl)] font-light tracking-[var(--bloom-letter-tight)] color-[var(--bloom-text)]">
                    bloom
                  </h1>
                </div>
                <p className="color-[var(--bloom-text-secondary)] text-[length:var(--bloom-text-subheading)] mt-[var(--space-sm)]">
                  Components that breathe.
                </p>
              </div>
              <div className="flex flex-col gap-[var(--space-sm)] items-end">
                <Dropdown
                  trigger={
                    <Button variant="secondary" className="min-w-[180px] justify-between">
                      {label}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className="ml-[var(--space-sm)]"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 5l3 3 3-3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  }
                >
                  <DropdownItem onSelect={() => setPalette("bloom")}>
                    {palette === "bloom" ? "● " : "○ "}Bloom (Default)
                  </DropdownItem>
                  <DropdownItem onSelect={() => setPalette("midnight")}>
                    {palette === "midnight" ? "● " : "○ "}Midnight Garden
                  </DropdownItem>
                  <DropdownItem onSelect={() => setPalette("desert")}>
                    {palette === "desert" ? "● " : "○ "}Desert Rose
                  </DropdownItem>
                  <DropdownItem onSelect={() => setPalette("ocean")}>
                    {palette === "ocean" ? "● " : "○ "}Ocean Mist
                  </DropdownItem>
                </Dropdown>
                <Toggle
                  label={resolvedMode === "dark" ? "Dark mode" : "Light mode"}
                  checked={resolvedMode === "dark"}
                  onCheckedChange={toggleColorMode}
                />
              </div>
            </header>

            {/* Buttons */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Buttons
              </h2>
              <div className="flex flex-wrap gap-[var(--space-md)]">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="danger">Danger</Button>
                <Button disabled>Disabled</Button>
              </div>
            </section>

            {/* Cards */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Cards
              </h2>
              <div className="grid grid-cols-2 gap-[var(--space-lg)]">
                <Card variant="interactive">
                  <CardHeader>
                    <CardTitle>Interactive Card</CardTitle>
                    <CardDescription>Hover to see the lift effect</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="color-[var(--bloom-text-secondary)]">
                      This card responds to hover with a gentle lift and border reveal.
                    </p>
                  </CardContent>
                </Card>
                <Card variant="featured">
                  <CardHeader>
                    <CardTitle>Featured Card</CardTitle>
                    <CardDescription>With accent border</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="color-[var(--bloom-text-secondary)]">A subtle accent border highlights this card.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost">Learn more</Button>
                  </CardFooter>
                </Card>
              </div>
            </section>

            {/* Inputs */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Inputs
              </h2>
              <div className="flex flex-col gap-[var(--space-md)] max-w-[400px]">
                <Input placeholder="Your name" />
                <Input type="email" placeholder="your@email.com" />
                <Textarea placeholder="Write something beautiful..." />
              </div>
            </section>

            {/* Toggle */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Toggle
              </h2>
              <div className="flex flex-col gap-[var(--space-md)]">
                <Toggle label="Ambient motion" defaultChecked />
                <Toggle label="Dark mode" />
                <Toggle label="Disabled" disabled />
              </div>
            </section>

            {/* Checkbox */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Checkbox
              </h2>
              <div className="flex flex-col gap-[var(--space-md)]">
                <Checkbox label="Accept terms and conditions" />
                <Checkbox label="Subscribe to updates" defaultChecked />
                <Checkbox label="Disabled" disabled />
                <Checkbox />
              </div>
            </section>

            {/* Radio Group */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Radio Group
              </h2>
              <div className="flex gap-[var(--space-3xl)]">
                <RadioGroup defaultValue="calm">
                  <RadioGroupItem value="calm" label="Calm" />
                  <RadioGroupItem value="focused" label="Focused" />
                  <RadioGroupItem value="energized" label="Energized" />
                  <RadioGroupItem value="disabled" label="Disabled" disabled />
                </RadioGroup>
              </div>
            </section>

            {/* Select */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Select
              </h2>
              <div className="flex flex-col gap-[var(--space-md)] max-w-[300px]">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="calm">Calm</SelectItem>
                    <SelectItem value="focused">Focused</SelectItem>
                    <SelectItem value="energized">Energized</SelectItem>
                    <SelectItem value="reflective">Reflective</SelectItem>
                  </SelectContent>
                </Select>
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Disabled select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Option A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </section>

            {/* Badges */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Badges
              </h2>
              <div className="flex flex-wrap gap-[var(--space-md)]">
                <Badge variant="sage" dot>
                  Active
                </Badge>
                <Badge variant="sand">Pending</Badge>
                <Badge variant="lavender">Draft</Badge>
                <Badge variant="rose">Archived</Badge>
              </div>
            </section>

            {/* Alerts */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Alerts
              </h2>
              <div className="flex flex-col gap-[var(--space-md)]">
                <Alert variant="info">
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>This is an informational message.</AlertDescription>
                </Alert>
                <Alert variant="success">
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Your changes have been saved.</AlertDescription>
                </Alert>
                <Alert variant="warning">
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>This action cannot be undone.</AlertDescription>
                </Alert>
                <Alert variant="error">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Something went wrong. Please try again.</AlertDescription>
                </Alert>
              </div>
            </section>

            {/* Avatars */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Avatars
              </h2>
              <div className="flex items-center gap-[var(--space-lg)]">
                <Avatar initials="JD" size="sm" />
                <Avatar initials="AB" size="md" />
                <Avatar initials="CD" size="lg" />
                <AvatarGroup>
                  <Avatar initials="A" />
                  <Avatar initials="B" />
                  <Avatar initials="C" />
                </AvatarGroup>
              </div>
            </section>

            {/* Tooltip */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Tooltip
              </h2>
              <div className="flex gap-[var(--space-md)]">
                <Tooltip content="This is a tooltip">
                  <Button variant="secondary">Hover me</Button>
                </Tooltip>
                <Tooltip content="Bottom tooltip" side="bottom">
                  <Button variant="ghost">Bottom</Button>
                </Tooltip>
              </div>
            </section>

            {/* Progress */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Progress
              </h2>
              <div className="flex flex-col gap-[var(--space-md)]">
                <Progress value={progress} />
                <div className="flex items-center gap-[var(--space-lg)]">
                  <ProgressCircular value={progress} />
                  <ProgressCircular value={progress} size={64} strokeWidth={6} />
                  <Slider
                    defaultValue={[progress]}
                    onValueChange={(v) => setProgress(v[0])}
                    aria-label="Progress"
                    className="w-[200px]"
                  />
                </div>
              </div>
            </section>

            {/* Modal */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Modal
              </h2>
              <Button variant="secondary" onClick={() => setModalOpen(true)}>
                Open Modal
              </Button>
              <Modal
                open={modalOpen}
                onOpenChange={setModalOpen}
                title="Hello, Bloom"
                description="This modal breathes with the rest of the interface."
              >
                <p className="color-[var(--bloom-text-secondary)]">
                  Modal content goes here. Notice the backdrop blur and smooth animation.
                </p>
                <div className="flex justify-end mt-[var(--space-lg)]">
                  <Button onClick={() => setModalOpen(false)}>Close</Button>
                </div>
              </Modal>
            </section>

            {/* Dropdown */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Dropdown
              </h2>
              <Dropdown trigger={<Button variant="secondary">Options</Button>}>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Duplicate</DropdownItem>
                <DropdownSeparator />
                <DropdownItem disabled>Delete</DropdownItem>
              </Dropdown>
            </section>

            {/* Tabs */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Tabs
              </h2>
              <Tabs defaultValue="overview">
                <TabsList variant="pill">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <Card>
                    <CardContent>Overview content lives here.</CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="activity">
                  <Card>
                    <CardContent>Activity feed content.</CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="settings">
                  <Card>
                    <CardContent>Settings panel content.</CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>

            {/* Date Picker */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Date Picker
              </h2>
              <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
            </section>

            {/* Toast */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Toast
              </h2>
              <ToastDemo />
            </section>

            {/* Skeleton */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Skeleton
              </h2>
              <Card>
                <CardContent>
                  <div className="flex items-center gap-[var(--space-md)]">
                    <Skeleton variant="avatar" />
                    <div className="flex-1 flex flex-col gap-[var(--space-sm)]">
                      <Skeleton variant="text" className="w-[60%]" />
                      <Skeleton variant="text" className="w-[40%]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* OTP Input */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                OTP Input
              </h2>
              <div className="flex flex-col gap-[var(--space-md)]">
                <OTPInput
                  length={6}
                  value={otp}
                  onChange={setOtp}
                  onComplete={(val) => console.warn("OTP complete:", val)}
                />
                <p className="text-[length:var(--bloom-text-caption)] color-[var(--bloom-text-secondary)]">
                  Value: {otp || "—"}
                </p>
              </div>
            </section>

            {/* Drawer */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Drawer
              </h2>
              <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
                Open Drawer
              </Button>
              <Drawer
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                title="Settings"
                description="Manage your preferences."
              >
                <div className="flex flex-col gap-[var(--space-md)] mt-[var(--space-lg)]">
                  <Toggle label="Notifications" defaultChecked />
                  <Toggle label="Sound effects" />
                  <Toggle label="Auto-save" defaultChecked />
                </div>
              </Drawer>
            </section>

            {/* Popover */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Popover
              </h2>
              <Popover trigger={<Button variant="secondary">Open Popover</Button>}>
                <div className="flex flex-col gap-[var(--space-md)]">
                  <p className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-body)] font-medium color-[var(--bloom-text)]">
                    Quick Actions
                  </p>
                  <Input placeholder="Search..." />
                  <div className="flex gap-[var(--space-sm)]">
                    <Button variant="primary" className="flex-1">
                      Save
                    </Button>
                    <Button variant="ghost" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </Popover>
            </section>

            {/* Accordion */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Accordion
              </h2>
              <Accordion type="single" collapsible className="max-w-[500px]">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is Bloom?</AccordionTrigger>
                  <AccordionContent>
                    Bloom is an ambient, organic React component library built for wellness apps, creative tools, and
                    any product where the interface should feel alive.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it customizable?</AccordionTrigger>
                  <AccordionContent>
                    Yes. All components use CSS custom properties and accept className props. You can also switch
                    between palettes at runtime.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely. Wrap your app with ThemeProvider and use the useTheme hook to toggle between light,
                    dark, and system modes.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Separator */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Separator
              </h2>
              <div className="flex flex-col gap-[var(--space-md)] max-w-[400px]">
                <p className="color-[var(--bloom-text-secondary)] text-[length:var(--bloom-text-body)]">
                  Above the line
                </p>
                <Separator />
                <p className="color-[var(--bloom-text-secondary)] text-[length:var(--bloom-text-body)]">
                  Below the line
                </p>
                <div className="flex items-center gap-[var(--space-md)] h-[40px]">
                  <span className="color-[var(--bloom-text-secondary)]">Left</span>
                  <Separator orientation="vertical" />
                  <span className="color-[var(--bloom-text-secondary)]">Middle</span>
                  <Separator orientation="vertical" />
                  <span className="color-[var(--bloom-text-secondary)]">Right</span>
                </div>
              </div>
            </section>

            {/* Spinner */}
            <section className="flex flex-col gap-[var(--space-lg)]">
              <h2 className="font-[family-name:var(--bloom-font-display)] text-[length:var(--bloom-text-heading)] font-medium color-[var(--bloom-text)]">
                Spinner
              </h2>
              <div className="flex items-center gap-[var(--space-2xl)]">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
                <Spinner size="md" label="Saving..." />
              </div>
            </section>
          </div>
        </div>
      </ToastProvider>
    </TooltipProvider>
  );
}

const paletteList = Object.values(palettes).filter((p) => p.name !== "bloom");

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <ThemeProvider defaultColorMode="system" palettes={paletteList}>
    <App />
  </ThemeProvider>
);
