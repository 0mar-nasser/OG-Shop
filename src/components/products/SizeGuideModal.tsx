import React from 'react';
import { CloseIcon } from '../common/Icons';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-right shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-xl p-6 sm:p-8 border border-stone-200">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
            <div>
              <h3 className="text-lg font-bold text-stone-900">دليل المقاسات الموحد</h3>
              <p className="text-xs text-stone-500">القياسات تقريبية ومحددة بالسنتيمتر (سم)</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <CloseIcon size={20} />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                  <th className="p-2.5">المقاس القياسي</th>
                  <th className="p-2.5">محيط الصدر (سم)</th>
                  <th className="p-2.5">محيط الخصر (سم)</th>
                  <th className="p-2.5">محيط الأرداف (سم)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-600">
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">XS</td>
                  <td className="p-2.5">82 - 86</td>
                  <td className="p-2.5">64 - 68</td>
                  <td className="p-2.5">88 - 92</td>
                </tr>
                <tr className="bg-stone-50/50">
                  <td className="p-2.5 font-bold text-stone-900">S</td>
                  <td className="p-2.5">87 - 92</td>
                  <td className="p-2.5">69 - 74</td>
                  <td className="p-2.5">93 - 98</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">M</td>
                  <td className="p-2.5">93 - 98</td>
                  <td className="p-2.5">75 - 80</td>
                  <td className="p-2.5">99 - 104</td>
                </tr>
                <tr className="bg-stone-50/50">
                  <td className="p-2.5 font-bold text-stone-900">L</td>
                  <td className="p-2.5">99 - 106</td>
                  <td className="p-2.5">81 - 88</td>
                  <td className="p-2.5">105 - 112</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">XL</td>
                  <td className="p-2.5">107 - 114</td>
                  <td className="p-2.5">89 - 96</td>
                  <td className="p-2.5">113 - 120</td>
                </tr>
                <tr className="bg-stone-50/50">
                  <td className="p-2.5 font-bold text-stone-900">XXL</td>
                  <td className="p-2.5">115 - 122</td>
                  <td className="p-2.5">97 - 104</td>
                  <td className="p-2.5">121 - 128</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200/70 text-xs text-stone-600 leading-relaxed">
            <strong className="text-stone-900 block mb-1">💡 نصيحة لاختيار المقاس المثالي:</strong>
            إذا كانت قياساتك تقع بين مقاسين، ننصح باختيار المقاس الأكبر للإطلالات المريحة (Relaxed Fit)، أو المقاس الأصغر للإطلالات المحددة للجسم (Slim Fit).
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors"
            >
              فهمت، شكراً
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
