import jsPDF from 'jspdf';
import { CAMPAIGN_DATA } from '../components/shoji/constants';

// A4 Landscape: 297mm x 210mm
const PAGE_WIDTH = 297;
const PAGE_HEIGHT = 210;
const MARGIN = 15;

// Color Palette
const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    red: '#DC2626',
    gray: {
        900: '#111827',
        700: '#374151',
        500: '#6B7280',
        300: '#D1D5DB',
        100: '#F3F4F6',
        50: '#F9FAFB'
    },
    blue: {
        700: '#1D4ED8',
        600: '#2563EB'
    },
    yellow: {
        400: '#FBBF24',
        500: '#F59E0B'
    }
};

// Helper: Draw wrapped text
const drawText = (
    pdf: jsPDF,
    text: string,
    x: number,
    y: number,
    options: {
        fontSize?: number;
        font?: 'normal' | 'bold';
        color?: string;
        align?: 'left' | 'center' | 'right';
        maxWidth?: number;
    } = {}
) => {
    const {
        fontSize = 10,
        font = 'normal',
        color = COLORS.black,
        align = 'left',
        maxWidth
    } = options;

    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', font);
    pdf.setTextColor(color);

    if (maxWidth) {
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.text(lines, x, y, { align });
        return lines.length * (fontSize * 0.35); // Return height used
    } else {
        pdf.text(text, x, y, { align });
        return fontSize * 0.35;
    }
};

// Helper: Draw rectangle
const drawRect = (
    pdf: jsPDF,
    x: number,
    y: number,
    width: number,
    height: number,
    options: {
        fill?: string;
        stroke?: string;
        lineWidth?: number;
        radius?: number;
    } = {}
) => {
    const { fill, stroke, lineWidth = 0.5, radius = 0 } = options;

    if (fill) {
        pdf.setFillColor(fill);
    }
    if (stroke) {
        pdf.setDrawColor(stroke);
        pdf.setLineWidth(lineWidth);
    }

    if (radius > 0) {
        pdf.roundedRect(x, y, width, height, radius, radius, fill ? 'FD' : 'S');
    } else {
        if (fill && stroke) {
            pdf.rect(x, y, width, height, 'FD');
        } else if (fill) {
            pdf.rect(x, y, width, height, 'F');
        } else {
            pdf.rect(x, y, width, height, 'S');
        }
    }
};

// Helper: Draw line
const drawLine = (
    pdf: jsPDF,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    options: { color?: string; lineWidth?: number } = {}
) => {
    const { color = COLORS.black, lineWidth = 0.5 } = options;
    pdf.setDrawColor(color);
    pdf.setLineWidth(lineWidth);
    pdf.line(x1, y1, x2, y2);
};

// Page 1: Cover Page
const drawCoverPage = (pdf: jsPDF) => {
    // Background
    drawRect(pdf, 0, 0, PAGE_WIDTH, PAGE_HEIGHT, { fill: COLORS.black });

    // White border frame
    drawRect(pdf, 30, 20, PAGE_WIDTH - 60, PAGE_HEIGHT - 40, {
        stroke: COLORS.white,
        lineWidth: 1.5
    });

    // Logo placeholder (text-based since we can't embed SVG easily)
    drawText(pdf, 'THEBRNE', PAGE_WIDTH / 2, 60, {
        fontSize: 32,
        font: 'bold',
        color: COLORS.white,
        align: 'center'
    });

    // Title
    drawText(pdf, '2026 Integrated', PAGE_WIDTH / 2, 95, {
        fontSize: 36,
        font: 'bold',
        color: COLORS.white,
        align: 'center'
    });
    drawText(pdf, 'Marketing Strategy', PAGE_WIDTH / 2, 110, {
        fontSize: 36,
        font: 'bold',
        color: COLORS.white,
        align: 'center'
    });

    // Subtitle
    drawText(pdf, 'Expansion & Brand Dominance Roadmap', PAGE_WIDTH / 2, 130, {
        fontSize: 14,
        color: COLORS.gray[300],
        align: 'center'
    });

    // Client box
    drawRect(pdf, PAGE_WIDTH / 2 - 60, 145, 120, 10, {
        stroke: COLORS.gray[700],
        lineWidth: 0.3
    });
    drawText(pdf, 'PREPARED FOR TIGER SHOJI SDN BHD', PAGE_WIDTH / 2, 152, {
        fontSize: 7,
        color: COLORS.gray[300],
        align: 'center'
    });

    // Footer
    drawText(pdf, 'STRICTLY CONFIDENTIAL · DO NOT DISTRIBUTE', PAGE_WIDTH / 2, 195, {
        fontSize: 6,
        color: COLORS.gray[700],
        align: 'center'
    });
};

// Standard Page Template
const drawPageTemplate = (
    pdf: jsPDF,
    title: string,
    subtitle: string,
    pageNumber: number
) => {
    // Header
    drawText(pdf, title, MARGIN, MARGIN + 5, {
        fontSize: 18,
        font: 'bold'
    });
    drawText(pdf, subtitle, MARGIN, MARGIN + 11, {
        fontSize: 10,
        color: COLORS.gray[500]
    });

    // Logo (top right)
    drawText(pdf, 'THEBRNE', PAGE_WIDTH - MARGIN, MARGIN + 5, {
        fontSize: 8,
        font: 'bold',
        align: 'right'
    });
    drawText(pdf, 'CONFIDENTIAL', PAGE_WIDTH - MARGIN, MARGIN + 9, {
        fontSize: 5,
        color: COLORS.red,
        font: 'bold',
        align: 'right'
    });

    // Header line
    drawLine(pdf, MARGIN, MARGIN + 13, PAGE_WIDTH - MARGIN, MARGIN + 13, {
        lineWidth: 0.8
    });

    // Footer line
    drawLine(pdf, MARGIN, PAGE_HEIGHT - MARGIN - 5, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - MARGIN - 5, {
        color: COLORS.gray[300],
        lineWidth: 0.3
    });

    // Footer text
    drawText(pdf, 'Tiger Shoji Sdn Bhd x TheBrne Agency', MARGIN, PAGE_HEIGHT - MARGIN + 1, {
        fontSize: 6,
        color: COLORS.gray[500]
    });
    drawText(pdf, '2026 Integrated Marketing Strategy', PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN + 1, {
        fontSize: 6,
        color: COLORS.gray[500],
        align: 'center'
    });
    drawText(pdf, `Page ${pageNumber}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - MARGIN + 1, {
        fontSize: 6,
        color: COLORS.gray[500],
        align: 'right'
    });

    return MARGIN + 18; // Return Y position where content should start
};

// Page 2: Business Ecosystem
const drawEcosystemPage = (pdf: jsPDF) => {
    const startY = drawPageTemplate(pdf, 'BUSINESS ECOSYSTEM', 'The One-Stop Mobility Concept', 2);

    let y = startY + 5;
    const colWidth = (PAGE_WIDTH - 3 * MARGIN) / 2;

    // Left column - Services
    let leftY = y;
    const services = [
        { title: 'Car Maintenance', desc: 'Japanese-standard Shaken & Shindan services. High-precision diagnostics and preventative care.' },
        { title: 'Subscription Harimau', desc: 'Modern vehicle leasing (MaaS). Flexible ownership models for expats and locals.' },
        { title: 'Flea Market Harimau', desc: 'Trusted C2C support for the Japanese community. Buy/Sell assurance.' }
    ];

    services.forEach((service, i) => {
        drawRect(pdf, MARGIN, leftY, colWidth, 30, {
            fill: COLORS.gray[50],
            stroke: COLORS.gray[100]
        });

        drawText(pdf, service.title, MARGIN + 3, leftY + 6, {
            fontSize: 12,
            font: 'bold'
        });

        drawText(pdf, service.desc, MARGIN + 3, leftY + 12, {
            fontSize: 8,
            color: COLORS.gray[700],
            maxWidth: colWidth - 6
        });

        leftY += 35;
    });

    // Right column - Philosophy
    const rightX = MARGIN + colWidth + MARGIN;
    drawRect(pdf, rightX, y, colWidth, 105, {
        fill: COLORS.gray[900],
        stroke: COLORS.gray[900]
    });

    drawText(pdf, 'CORE PHILOSOPHY', rightX + 5, y + 8, {
        fontSize: 10,
        font: 'bold',
        color: COLORS.gray[500]
    });

    drawText(pdf, '"Omotenashi"', rightX + 5, y + 25, {
        fontSize: 20,
        font: 'bold',
        color: COLORS.white
    });

    drawText(pdf, 'Bringing true Japanese hospitality to the Malaysian automotive sector. It\'s not just about fixing cars; it\'s about anticipating needs and ensuring peace of mind for every journey.',
        rightX + 5, y + 38, {
        fontSize: 9,
        color: COLORS.gray[300],
        maxWidth: colWidth - 10
    });
};

// Page 3: Strategic Analysis
const drawStrategyPage = (pdf: jsPDF) => {
    const startY = drawPageTemplate(pdf, 'STRATEGIC ANALYSIS', 'Market Opportunity & 2026 Festive Surge', 3);

    let y = startY + 5;
    const colWidth = (PAGE_WIDTH - 3 * MARGIN) / 2;

    // Left column
    drawText(pdf, 'The "Rare Cycle" Anomaly', MARGIN, y + 5, {
        fontSize: 14,
        font: 'bold',
        color: COLORS.red
    });

    drawText(pdf, 'In 2026, Chinese New Year (Feb 17) and Hari Raya (Mar 19) occur within just 30 days of each other.',
        MARGIN, y + 13, {
        fontSize: 10,
        color: COLORS.gray[700],
        maxWidth: colWidth - 5
    });

    drawLine(pdf, MARGIN, y + 25, MARGIN + colWidth, y + 25, {
        color: COLORS.gray[300]
    });

    drawText(pdf, 'The 60-Day Surge', MARGIN, y + 33, {
        fontSize: 14,
        font: 'bold'
    });

    drawText(pdf, 'This creates a continuous 60-day window of maximum road-trip activity, vehicle stress, and service demand.',
        MARGIN, y + 40, {
        fontSize: 10,
        color: COLORS.gray[700],
        maxWidth: colWidth - 5
    });

    // Yellow highlight box
    drawRect(pdf, MARGIN, y + 55, colWidth, 30, {
        fill: COLORS.yellow[400] + '20',
        stroke: COLORS.yellow[400],
        lineWidth: 1
    });

    drawText(pdf, 'THE STRATEGY', MARGIN + 3, y + 60, {
        fontSize: 7,
        font: 'bold',
        color: COLORS.yellow[500]
    });

    drawText(pdf, 'Capture the "Early Bird" Market.', MARGIN + 3, y + 67, {
        fontSize: 11,
        font: 'bold'
    });

    drawText(pdf, 'While competitors fight for last-minute emergency repairs, Tiger Shoji will own the distinct "1-Month Prep" segment.',
        MARGIN + 3, y + 73, {
        fontSize: 8,
        color: COLORS.gray[700],
        maxWidth: colWidth - 6
    });

    // Right column - Phases
    const rightX = MARGIN + colWidth + MARGIN;
    drawRect(pdf, rightX, y, colWidth, 88, {
        fill: COLORS.gray[100]
    });

    drawText(pdf, 'EXECUTION PHASES', rightX + 5, y + 7, {
        fontSize: 8,
        font: 'bold',
        color: COLORS.gray[500]
    });

    const phases = [
        { name: 'Phase 1 (Feb-Apr)', desc: 'Festive Peak (Safety & Reliability)' },
        { name: 'Phase 2 (May-Aug)', desc: 'Expansion (Subscription & Klang)' },
        { name: 'Phase 3 (Sep-Nov)', desc: 'Monsoon Prep (Tyres & Safety)' },
        { name: 'Phase 4 (Dec-Jan)', desc: 'Renewal (Body Coating)' }
    ];

    let phaseY = y + 15;
    phases.forEach(phase => {
        drawText(pdf, phase.name, rightX + 5, phaseY, {
            fontSize: 11,
            font: 'bold'
        });
        drawText(pdf, phase.desc, rightX + 50, phaseY, {
            fontSize: 9,
            color: COLORS.gray[700]
        });
        phaseY += 15;
    });
};

// Page 7-8: Roadmap Pages
const drawRoadmapPage = (pdf: jsPDF, title: string, data: any[], pageNumber: number) => {
    const startY = drawPageTemplate(pdf, title, '', pageNumber);

    const cols = 2;
    const rows = 3;
    const gap = 4;
    const cardWidth = (PAGE_WIDTH - 2 * MARGIN - gap) / cols;
    const cardHeight = (PAGE_HEIGHT - startY - MARGIN - gap * 2) / rows;

    data.forEach((item, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const x = MARGIN + col * (cardWidth + gap);
        const y = startY + row * (cardHeight + gap);

        // Card background
        drawRect(pdf, x, y, cardWidth, cardHeight, {
            fill: COLORS.white,
            stroke: COLORS.gray[300]
        });

        // Header
        drawText(pdf, item.event, x + 3, y + 4, {
            fontSize: 7,
            font: 'bold',
            color: COLORS.red
        });

        drawText(pdf, item.month, x + 3, y + 9, {
            fontSize: 12,
            font: 'bold'
        });

        // Budget pill
        drawRect(pdf, x + cardWidth - 28, y + 3, 25, 6, {
            fill: COLORS.black
        });
        drawText(pdf, `RM ${item.budget}`, x + cardWidth - 15.5, y + 7, {
            fontSize: 7,
            font: 'bold',
            color: COLORS.white,
            align: 'center'
        });
        drawText(pdf, 'ALLOCATION', x + cardWidth - 15.5, y + 10, {
            fontSize: 5,
            color: COLORS.gray[500],
            align: 'center'
        });

        // Divider
        drawLine(pdf, x + 3, y + 13, x + cardWidth - 3, y + 13, {
            color: COLORS.gray[100]
        });

        // Content
        const contentY = y + 17;

        // Push Period
        drawRect(pdf, x + 3, contentY, 25, 4, {
            fill: COLORS.gray[100]
        });
        drawText(pdf, 'PUSH PERIOD', x + 4, contentY + 2.5, {
            fontSize: 5,
            font: 'bold',
            color: COLORS.gray[700]
        });
        drawText(pdf, item.pushPeriod, x + 3, contentY + 7, {
            fontSize: 8,
            font: 'bold',
            maxWidth: cardWidth - 6
        });

        // Key Focus
        drawRect(pdf, x + 3, contentY + 13, 20, 4, {
            fill: COLORS.gray[100]
        });
        drawText(pdf, 'KEY FOCUS', x + 4, contentY + 15.5, {
            fontSize: 5,
            font: 'bold',
            color: COLORS.gray[700]
        });
        drawText(pdf, item.focus, x + 3, contentY + 20, {
            fontSize: 7,
            color: COLORS.gray[700],
            maxWidth: cardWidth - 6
        });

        // Footer
        const footerY = y + cardHeight - 10;
        drawRect(pdf, x, footerY, cardWidth, 10, {
            fill: COLORS.gray[50]
        });
        drawText(pdf, `Breakdown: ${item.breakdown}`, x + 2, footerY + 4, {
            fontSize: 6,
            color: COLORS.gray[500]
        });
        if (item.metrics) {
            drawText(pdf, item.metrics, x + 2, footerY + 8, {
                fontSize: 6,
                font: 'bold',
                color: COLORS.blue[600]
            });
        }
    });
};

// Main function to generate complete PDF
export const generateVectorPDF = () => {
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    // Page 1: Cover
    drawCoverPage(pdf);

    // Page 2: Ecosystem
    pdf.addPage();
    drawEcosystemPage(pdf);

    // Page 3: Strategy
    pdf.addPage();
    drawStrategyPage(pdf);

    // Page 4-6: Additional pages would go here (Channel Strategy, Budget, etc.)
    // For brevity, skipping to roadmap

    // Page 7: Roadmap 1
    pdf.addPage();
    drawRoadmapPage(pdf, 'MARKETING ROADMAP: FEB - JUL 2026', CAMPAIGN_DATA.slice(0, 6), 7);

    // Page 8: Roadmap 2
    pdf.addPage();
    drawRoadmapPage(pdf, 'MARKETING ROADMAP: AUG - JAN 2027', CAMPAIGN_DATA.slice(6, 12), 8);

    // Download
    pdf.save('THEBRNE_TigerShoji_Marketing2026_CONFIDENTIAL.pdf');
};
