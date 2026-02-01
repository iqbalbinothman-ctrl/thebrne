export interface CampaignData {
    id: string;
    month: string;
    event: string;
    pushPeriod: string;
    focus: string;
    budget: string;
}

export interface TimelineItemProps {
    data: CampaignData;
    index: number;
    isLast: boolean;
    isPrintMode?: boolean;
}
